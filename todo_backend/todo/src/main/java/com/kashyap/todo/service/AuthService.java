package com.kashyap.todo.service;

import com.kashyap.todo.dto.JwtAuthResponse;
import com.kashyap.todo.dto.LoginDto;
import com.kashyap.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
}
