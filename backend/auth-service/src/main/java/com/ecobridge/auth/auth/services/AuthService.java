package com.ecobridge.auth.auth.services;

import com.ecobridge.auth.auth.payload.UserDto;

public interface AuthService {
    UserDto registerUser(UserDto userDto);
}
