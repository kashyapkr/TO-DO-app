package com.kashyap.todo.configuration;

import com.kashyap.todo.security.CustomUserDetailsService;
import com.kashyap.todo.security.JwtAuthenticationEntryPoint;
import com.kashyap.todo.security.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity //enables @preauthorize()
@AllArgsConstructor
public class SpringSecurityConfig {

    private UserDetailsService userDetailsService;
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean //👇to encode the raw password comming from the userDetailsService //done automatically from spring 6
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    👇  Doubt🤷‍♀ I have used method level security so don't have to configure filter chain(@EnableMethodSecurity, @Preauthorize())'???//️
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable()).
                authorizeHttpRequests((authorize) -> {
//                    authorize.requestMatchers(HttpMethod.POST, "/api/**").hasRole("ADMIN"); //allow to only admin
//
//                    authorize.requestMatchers(HttpMethod.GET, "/api/**").hasAnyRole("ADMIN", "USER");
//
//                    //allow to admin and user
//                    authorize.requestMatchers(HttpMethod.DELETE, "/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.PUT, "/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.PATCH, "/api/**").hasAnyRole("ADMIN", "USER");
//                    authorize.requestMatchers(HttpMethod.GET, "/api/**").permitAll(); //Exposing these get method publically NO NEED TO PASS DETAILS IN THE HEADER

                    authorize.requestMatchers("/api/auth/**").permitAll();
                    authorize.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll();
                    authorize.anyRequest().authenticated();

                })
                .httpBasic(Customizer.withDefaults());
            http.exceptionHandling(exception->exception
                    .authenticationEntryPoint(jwtAuthenticationEntryPoint));  //if any authentication exception throw from authenticationEntrypoint class
            http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); //adding jwtAuthenticationFilter before spring security filters

        return http.build();
    }

    //👇👇For database authentication we will pass the userdetails service iterface to authentication manager, (userdetailsService) has customeuserdetails class as implementation
    //class which overides the lodabyusername method to get user from database. Since spring securit 6 we don't have to manually pass userdetails service to auth manager.
    //We just have to inject userdetailsservice and auth bean will automatically take the object.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();

    }

  /*@Bean 👇👇 //InMEMORY AUTHENTICATION
    public UserDetailsService userDetailsService(){

        //Wtihe help of userdetails object we are createing different users and returning it using inmemory userdetails MANAGER
        UserDetails kashyap = User.builder()
                .username("user")
                .password(passwordEncoder().encode("user"))
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("admin"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(kashyap,admin);

    }*/

}
