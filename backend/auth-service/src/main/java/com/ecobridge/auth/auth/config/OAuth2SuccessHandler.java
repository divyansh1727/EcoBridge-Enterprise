package com.ecobridge.auth.auth.config;

import com.ecobridge.auth.auth.entities.Provider;
import com.ecobridge.auth.auth.entities.RefreshToken;
import com.ecobridge.auth.auth.entities.User;
import com.ecobridge.auth.auth.repositories.RefreshTokenRepository;
import com.ecobridge.auth.auth.repositories.RoleRepository;
import com.ecobridge.auth.auth.repositories.UserRepository;
import com.ecobridge.auth.auth.services.impl.CookieService;
import com.ecobridge.auth.auth.services.impl.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.ecobridge.auth.auth.entities.Role;
import java.io.IOException;
import java.time.Instant;
import java.util.HashSet;
import java.util.UUID;



@Component
//@AllArgsConstructor
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RoleRepository roleRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieService cookieService;
    private final Logger logger= LoggerFactory.getLogger(this.getClass());
    @Value("${app.auth.frontend.success-redirect}")
    private String frontEndSuccessUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        try{
        logger.info("Successful Auth...");
        logger.info(authentication.toString());
        OAuth2User oAuth2User= (OAuth2User)authentication.getPrincipal();
        String registrationId="unknown";
        if(authentication instanceof OAuth2AuthenticationToken token){
            registrationId=token.getAuthorizedClientRegistrationId();
        }logger.info("registrationId:"+registrationId);logger.info("user"+oAuth2User.getAttributes().toString());
        User user = null;
        switch (registrationId) {
            case "google" -> {
                String googleId = oAuth2User.getAttributes().getOrDefault("sub", "").toString();
                String email = oAuth2User.getAttributes().getOrDefault("email", "").toString();
                String name = oAuth2User.getAttributes().getOrDefault("name", "").toString();
                String picture = oAuth2User.getAttributes().getOrDefault("picture", "").toString();
                User newUser = User.builder()
                        .email(email)
                        .name(name)
                        .image(picture)
                        .enable(true)
                        .provider(Provider.GOOGLE)
                        .roles(new HashSet<>())
                        .build();
//                userRepository.findByEmail(email).ifPresentOrElse(user1 -> {
//                    logger.info("User is there in db");
//                    logger.info(user1.toString());
//                }, () -> {
//                    userRepository.save(user);
//
//
//                });
                user = userRepository.findByEmail(email)
                        .orElseGet(() -> {

                            Role role = roleRepository
                                    .findByName("ROLE_GENERATOR")
                                    .orElseThrow(() ->
                                            new RuntimeException("ROLE_GENERATOR not found"));

                            newUser.getRoles().add(role);

                            return userRepository.save(newUser);

                        });
            }
            case "github" ->{
                String name = oAuth2User.getAttributes().getOrDefault("login", "").toString();
                String githubId = oAuth2User.getAttributes().getOrDefault("id", "").toString();
                String image = oAuth2User.getAttributes().getOrDefault("avatar_url", "").toString();

                String email = (String) oAuth2User.getAttributes().get("email");
                if (email == null) {
                    email = name + "@github.com";
                }

                User newUser = User.builder()
                        .email(email)
                        .name(name)
                        .image(image)
                        .enable(true)
                        .provider(Provider.GITHUB)
                        .roles(new HashSet<>())
                        .build();
                user = userRepository.findByEmail(email)
                        .orElseGet(() -> {

                            Role role = roleRepository
                                    .findByName("ROLE_GENERATOR")
                                    .orElseThrow(() ->
                                            new RuntimeException("ROLE_GENERATOR not found"));

                            newUser.getRoles().add(role);

                            return userRepository.save(newUser);

                        });



            }
            default -> throw new RuntimeException("Invalid registration id");

        }
            String jti = UUID.randomUUID().toString();
            RefreshToken refreshTokenOb = RefreshToken.builder()
                    .jti(jti)
                    .user(user)
                    .revoked(false)
                    .createdAt(Instant.now())
                    .expiredAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                    .build();
            refreshTokenRepository.save(refreshTokenOb);
        System.out.println("LOGIN USER = " + user.getEmail());

        System.out.println("ROLES COUNT = " + user.getRoles().size());

        user.getRoles().forEach(role ->
                System.out.println("ROLE = " + role.getName())
        );
            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user, refreshTokenOb.getJti());
            cookieService.attachRefreshCookie(response, refreshToken, (int) jwtService.getRefreshTtlSeconds());
//        response.getWriter().write("Login successful");
        response.sendRedirect(
                frontEndSuccessUrl +
                        "?token=" + accessToken
        );

    }
    catch (Exception e) {
        logger.error("OAuth Success Handler crashed", e);
        throw e;
    }
}
}