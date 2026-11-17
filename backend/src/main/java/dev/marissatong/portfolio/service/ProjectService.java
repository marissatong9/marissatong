package dev.marissatong.portfolio.service;

import dev.marissatong.portfolio.dto.ProjectResponseDTO;
import dev.marissatong.portfolio.model.Project;
import dev.marissatong.portfolio.repository.ProjectRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {
  private final ProjectRepository projectRepository;

  public List<ProjectResponseDTO> getProjects() {
    return projectRepository.findAllByOrderByYearDesc().stream()
        .map(this::toProjectResponseDTO)
        .toList();
  }

  private ProjectResponseDTO toProjectResponseDTO(Project project) {
    return ProjectResponseDTO.builder()
        .title(project.getTitle())
        .description(project.getDescription())
        .context(project.getContext())
        .problem(project.getProblem())
        .approach(project.getApproach())
        .outcome(project.getOutcome())
        .year(project.getYear())
        .role(project.getRole())
        .focus(project.getFocus())
        .type(project.getType())
        .skills(project.getSkills())
        .build();
  }
}
