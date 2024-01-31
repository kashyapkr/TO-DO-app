package com.kashyap.todo.service;

import com.kashyap.todo.dto.JwtAuthResponse;
import com.kashyap.todo.dto.LoginDto;
import com.kashyap.todo.dto.RegisterDto;
import com.kashyap.todo.entity.Role;
import com.kashyap.todo.entity.User;
import com.kashyap.todo.exception.TodoApiException;
import com.kashyap.todo.repository.RoleRepository;
import com.kashyap.todo.repository.UserRepository;
import com.kashyap.todo.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AutheServiceImpl implements  AuthService{

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {
        //check if user exists or not
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw  new TodoApiException(HttpStatus.BAD_REQUEST,"User already exists");
        }
        //check if email exists or not
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new TodoApiException(HttpStatus.BAD_REQUEST,"Email already exists!");
        }
        User user  = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName("ROLE_USER"));
        user.setRoles(roles);
        userRepository.save(user);

        return "Registered succesfully";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {
        //👇Authenticating username and password, UsernamePasswrodAuthencationToken is an implementation class of authenticate
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(),loginDto.getPassword()));
        //👇Setting authentication object to securinty context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail());
        String role = null;
        if(userOptional.isPresent()){
            User loggedinUsr = userOptional.get();
            Optional<Role> optionalRole = loggedinUsr.getRoles().stream().findFirst();

            if(optionalRole.isPresent()){
                Role userRole = optionalRole.get();
                role = userRole.getName();
            }
        }
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(role);
        jwtAuthResponse.setAccessToken(token);
        return jwtAuthResponse;
    }
}
