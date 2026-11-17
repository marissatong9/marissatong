package dev.marissatong.portfolio.controller;

import dev.marissatong.portfolio.dto.ProjectResponseDTO;
import dev.marissatong.portfolio.service.ProjectService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/projects")
public class ProjectController {

  private final ProjectService projectService;

  @GetMapping
  public ResponseEntity<List<ProjectResponseDTO>> getProjects() {
    return ResponseEntity.ok(projectService.getProjects());
  }
}
