package com.skillsphere.backend.studyroom.dto;

import com.skillsphere.backend.studyroom.entity.MessageType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Request body for posting a message
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostMessageRequestDTO {
    
    @NotBlank(message = "Message cannot be empty")
    @Size(min = 1, max = 5000, message = "Message must be between 1 and 5000 characters")
    private String message;
    
    @Builder.Default
    private MessageType messageType = MessageType.TEXT;
}
