package com.ecobridge.auth.auth.services.impl;

import com.ecobridge.auth.auth.config.AppConstants;
import com.ecobridge.auth.auth.payload.ChangePasswordRequest;
import com.ecobridge.auth.auth.payload.DeleteAccountRequest;
import com.ecobridge.auth.auth.payload.UserDto;
import com.ecobridge.auth.auth.entities.Provider;
import com.ecobridge.auth.auth.entities.Role;
import com.ecobridge.auth.auth.entities.User;
import com.ecobridge.auth.auth.repositories.RefreshTokenRepository;
import com.ecobridge.auth.dto.response.UserStatsResponse;
import com.ecobridge.auth.exceptions.ResourceNotFoundException;
import com.ecobridge.auth.auth.helpers.UserHelper;
import com.ecobridge.auth.auth.repositories.RoleRepository;
import com.ecobridge.auth.auth.repositories.UserRepository;
import com.ecobridge.auth.auth.services.UserService;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.HashSet;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final CloudinaryService cloudinaryService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {

        if (userDto.getEmail() == null || userDto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("User with given email already exists");
        }

        // DTO -> Entity
        User user = modelMapper.map(userDto, User.class);

        if (user.getEnable() == null) {
            user.setEnable(true);
        }

        // Default provider
        user.setProvider(
                userDto.getProvider() != null
                        ? userDto.getProvider()
                        : Provider.LOCAL
        );

        // Prevent NPE from ModelMapper
        if (user.getRoles() == null) {
            user.setRoles(new HashSet<>());
        }

        // Assign default role
        String roleName =
                userDto.getRole() == null || userDto.getRole().isBlank()
                        ? "ROLE_GENERATOR"
                        : userDto.getRole();

        Role role = roleRepository
                .findByName(roleName)
                .orElseThrow(() ->
                        new RuntimeException(roleName + " not found"));

        user.getRoles().add(role);

        // Save user
        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given email id "));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId) {
        UUID uId = UserHelper.parseUUID(userId);
        User existingUser = userRepository
                .findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));
        //we are not going to change email id for this project.
        if (userDto.getName() != null) existingUser.setName(userDto.getName());
        if (userDto.getImage() != null) existingUser.setImage(userDto.getImage());
        if (userDto.getProvider() != null) existingUser.setProvider(userDto.getProvider());
        if (userDto.getPhoneNumber() != null &&
                !userDto.getPhoneNumber().matches("\\d{10}")) {

            throw new BadRequestException(
                    "Phone number must contain exactly 10 digits"
            );

        }
        if (userDto.getPhoneNumber() != null) existingUser.setPhoneNumber(userDto.getPhoneNumber());
        //TODO: change password updation logic...
        if (userDto.getPassword() != null) existingUser.setPassword(userDto.getPassword());
        existingUser.setEnable(userDto.getEnable());
        existingUser.setUpdatedAt(Instant.now());
        User updatedUser = userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public UserStatsResponse getUserStats() {

        return UserStatsResponse.builder()

                .totalUsers(
                        userRepository.count()
                )

                .totalGenerators(
                        userRepository.countByRoles_Name("ROLE_GENERATOR")
                )

                .totalRecyclers(
                        userRepository.countByRoles_Name("ROLE_RECYCLER")
                )

                .build();

    }

    @Override
    public void deleteUser(String userId) {
        UUID uId = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uId).orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));
        userRepository.delete(user);
    }

    @Override
    public UserDto getUserById(String userId) {
        User user = userRepository.findById(UserHelper.parseUUID(userId)).orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    @Transactional
    public Iterable<UserDto> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .toList();
    }

    @Override
    @Transactional
    public UserDto updateProfileImage(String userId, MultipartFile file) throws IOException {

        UUID uId = UserHelper.parseUUID(userId);

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String imageUrl = cloudinaryService.uploadImage(file);

        user.setImage(imageUrl);

        User updatedUser = userRepository.save(user);

        return modelMapper.map(updatedUser, UserDto.class);
    }
    @Override
    @Transactional
    public void changePassword(String userId, ChangePasswordRequest request) {

        UUID uId = UserHelper.parseUUID(userId);

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getProvider() != Provider.LOCAL) {
            throw new IllegalArgumentException(
                    "Password cannot be changed for OAuth accounts");
        }

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("New password and confirm password do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }
    @Override
    @Transactional
    public void deleteAccount(String userId, DeleteAccountRequest request) {

        UUID uId = UserHelper.parseUUID(userId);

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // LOCAL account -> verify password
        if (user.getProvider() == Provider.LOCAL) {

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new IllegalArgumentException("Incorrect password");
            }
        }

        // TODO: Delete Cloudinary image (next step)

        // TODO: Delete refresh tokens
        refreshTokenRepository.deleteByUser(user);

        // Delete user
        userRepository.delete(user);
    }
}