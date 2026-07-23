package com.ecobridge.auth.auth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SessionDebugFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);

        System.out.println("=================================");
        System.out.println("URI : " + request.getRequestURI());

        if (session == null) {
            System.out.println("SESSION : null");
        } else {
            System.out.println("SESSION ID : " + session.getId());
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String uri = request.getRequestURI();

        // Only log OAuth requests
        return !(uri.startsWith("/oauth2")
                || uri.startsWith("/login/oauth2"));
    }
}