package com.skillsphere.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Enable simple message broker for pub/sub
        config.enableSimpleBroker("/topic");
        
        // Prefix for messages from client to server
        config.setApplicationDestinationPrefixes("/app");
    }

   @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws")
        .setAllowedOriginPatterns(
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "http://192.168.*.*:5173",
            "http://10.*.*.*:5173"
        )
        .withSockJS();
}
}
