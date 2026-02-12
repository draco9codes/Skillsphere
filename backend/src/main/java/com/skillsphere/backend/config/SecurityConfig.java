package com.skillsphere.backend.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                // ========================================
                // PUBLIC ENDPOINTS (No Auth Required)
                // ========================================
                
                // Auth endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/home/**").permitAll()
                
                // Health checks
                .requestMatchers("/api/*/health").permitAll()
                
                // Journey/Skill Trees - Public browsing
                .requestMatchers("/api/journey/trees/all").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/journey/**").permitAll()
                
                // Projects - Public browsing
                .requestMatchers(HttpMethod.GET, "/api/projects").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/projects/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/projects/showcase").permitAll()
                
                // Study Rooms - Public browsing
                .requestMatchers(HttpMethod.GET, "/api/study-rooms").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/study-rooms/{id}").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/study-rooms/*/messages").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/study-rooms/upcoming").permitAll()
                .requestMatchers("/ws/**").permitAll()

                // ========================================
                // AUTHENTICATED ENDPOINTS
                // ========================================
                
                // Journey - Auth required for modifications
                .requestMatchers(HttpMethod.POST, "/api/journey/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/journey/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/journey/**").authenticated()
                
                // Projects - Auth required
                .requestMatchers(HttpMethod.POST, "/api/projects/*/start").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/projects/submissions/*").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/projects/submissions/*/complete").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/projects/my-submissions").authenticated()
                
                // Study Rooms - Auth required
                .requestMatchers(HttpMethod.POST, "/api/study-rooms").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/study-rooms/*/join").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/study-rooms/*/leave").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/study-rooms/*/messages").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/study-rooms/*/close").authenticated()
                .requestMatchers(HttpMethod.PUT, "/api/study-rooms/*").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/study-rooms/messages/*").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/study-rooms/my-rooms").authenticated()
                .requestMatchers(HttpMethod.GET, "/api/study-rooms/my-rooms/*").authenticated()
                
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowCredentials(true);

    // IMPORTANT: patterns, so LAN IP works
    config.setAllowedOriginPatterns(Arrays.asList(
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://192.168.*.*:5173",
        "http://10.*.*.*:5173"
    ));

    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
    config.setAllowedHeaders(Arrays.asList("*"));
    config.setExposedHeaders(Arrays.asList("Set-Cookie"));
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}

}
