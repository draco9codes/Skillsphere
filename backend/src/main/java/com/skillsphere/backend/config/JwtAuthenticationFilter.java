package com.skillsphere.backend.config;

import java.io.IOException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger =
            LogManager.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        logger.info("🔵 JwtAuthenticationFilter processing: {}", requestURI);

        try {
            String token = null;

            // ✅ Extract JWT from COOKIE
            if (request.getCookies() != null) {
                logger.info("🍪 Cookies received: {}", request.getCookies().length);
                
                for (jakarta.servlet.http.Cookie cookie : request.getCookies()) {
                    logger.info("   Cookie name: {}", cookie.getName());
                    
                    if ("jwt".equals(cookie.getName())) {
                        token = cookie.getValue();
                        logger.info("✅ JWT cookie found!");
                        break;
                    }
                }
            } else {
                logger.warn("⚠️ No cookies in request for {}", requestURI);
            }

            if (token != null) {
                logger.info("🔍 Validating token...");
                
                if (jwtUtil.validateToken(token)) {
                    String username = jwtUtil.extractUsername(token);
                    logger.info("✓ JWT validated for user: {}", username);

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    username, null, null);

                    SecurityContextHolder.getContext().setAuthentication(auth);
                    logger.info("✅ Authentication set in SecurityContext");
                } else {
                    logger.warn("❌ Token validation failed");
                }
            } else {
                logger.warn("❌ No JWT token found in cookies");
            }

        } catch (Exception e) {
            logger.error("💥 JWT processing failed", e);
        }

        logger.info("➡️ Continuing filter chain...");
        filterChain.doFilter(request, response);
    }
}
