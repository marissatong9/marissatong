package dev.marissatong.portfolio.dto;

import dev.marissatong.portfolio.model.ProjectFocus;
import dev.marissatong.portfolio.model.ProjectRole;
import dev.marissatong.portfolio.model.ProjectType;
import java.util.List;
import lombok.Builder;

@Builder
public record ProjectResponseDTO(
    String title,
    String description,
    String context,
    String problem,
    String approach,
    String outcome,
    Integer year,
    ProjectRole role,
    ProjectFocus focus,
    ProjectType type,
    List<String> skills) {}
