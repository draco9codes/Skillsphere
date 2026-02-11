package com.skillsphere.backend.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a learning resource link
 * Parsed from resourceLinksJson field
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResourceLinkDTO {
    private String title;     // "React Official Docs"
    private String url;       // "https://react.dev"
    private String type;      // "documentation", "video", "article"
}
