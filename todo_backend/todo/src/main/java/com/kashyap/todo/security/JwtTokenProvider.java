package com.kashyap.todo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String jwtSecret;
    @Value("${app.jwt-expiration-milliseconds}")
    private Long jwtExpirationDate;

    //👇generate JWT token
    public String generateToken(Authentication authentication){
        String username = authentication.getName();

        Date currDate = new Date();

        Date expireDate = new Date(currDate.getTime()+jwtExpirationDate);

        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(key())
                .compact();

        return token;
    }

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    //👇Get username from JWT token
    public String getUsername(String token){

        return Jwts.parserBuilder()
                .setSigningKey((SecretKey)key())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

    }

    //👇Validating the token
    public boolean validateToken(String token){
        try{
            Jwts.parserBuilder()
                    .setSigningKey((SecretKey)key())
                    .build()
                    .parse(token);
            return true;
        }
        catch (Exception e ){
            return false;
        }

    }

}
