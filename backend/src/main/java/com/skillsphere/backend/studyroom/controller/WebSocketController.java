package com.skillsphere.backend.studyroom.controller;

import com.skillsphere.backend.studyroom.dto.RoomMessageDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
public class WebSocketController {

    /**
     * Receive message from client and broadcast to all room subscribers
     * Client sends to: /app/room/{roomId}/message
     * Server broadcasts to: /topic/room/{roomId}
     */
    @MessageMapping("/room/{roomId}/message")
    @SendTo("/topic/room/{roomId}")
    public RoomMessageDTO sendMessage(
            @DestinationVariable Long roomId,
            RoomMessageDTO message
    ) {
        log.info("Broadcasting message to room {}: {}", roomId, message.getMessage());
        return message;
    }

    /**
     * Broadcast user joined event
     */
    @MessageMapping("/room/{roomId}/join")
    @SendTo("/topic/room/{roomId}")
    public RoomMessageDTO userJoined(
            @DestinationVariable Long roomId,
            RoomMessageDTO message
    ) {
        log.info("User joined room {}: {}", roomId, message.getUsername());
        return message;
    }

    /**
     * Broadcast user left event
     */
    @MessageMapping("/room/{roomId}/leave")
    @SendTo("/topic/room/{roomId}")
    public RoomMessageDTO userLeft(
            @DestinationVariable Long roomId,
            RoomMessageDTO message
    ) {
        log.info("User left room {}: {}", roomId, message.getUsername());
        return message;
    }
}
