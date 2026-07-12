package com.ecobridge.auth.auth.services;

import com.ecobridge.auth.auth.payload.ChangePasswordRequest;
import com.ecobridge.auth.auth.payload.DeleteAccountRequest;
import com.ecobridge.auth.auth.payload.UserDto;
import java.io.IOException;

import com.ecobridge.auth.dto.response.UserStatsResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    //create user
    UserDto createUser(UserDto userDto);

    //get user by email
    UserDto getUserByEmail(String email);

    //update user
    UserDto updateUser(UserDto userDto, String userId);

    //delete user
    void deleteUser(String userId);

    //get user by id
    UserDto getUserById(String userId);

    //get all users
    Iterable<UserDto> getAllUsers();

    //to updateprofileimage
    UserDto updateProfileImage(String userId, MultipartFile file) throws IOException;

    // user service se related __
    void changePassword(String userId, ChangePasswordRequest request);

    //to delete the user
    void deleteAccount(String userId, DeleteAccountRequest request);

    UserStatsResponse getUserStats();



}