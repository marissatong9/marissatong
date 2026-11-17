package dev.marissatong.portfolio.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.marissatong.portfolio.dto.ProjectResponseDTO;
import dev.marissatong.portfolio.model.ProjectFocus;
import dev.marissatong.portfolio.model.ProjectRole;
import dev.marissatong.portfolio.model.ProjectType;
import dev.marissatong.portfolio.service.ProjectService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ProjectController.class)
class ProjectControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockitoBean private ProjectService projectService;

  @Test
  void getProjectsReturns200WithProjects() throws Exception {
    ProjectResponseDTO portfolio =
        ProjectResponseDTO.builder()
            .title("Portfolio")
            .description("My personal site.")
            .year(2026)
            .role(ProjectRole.SOLO)
            .focus(ProjectFocus.FULL_STACK)
            .type(ProjectType.PERSONAL)
            .skills(List.of("React", "Spring Boot"))
            .build();
    when(projectService.getProjects()).thenReturn(List.of(portfolio));

    mockMvc
        .perform(get("/api/projects"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].title").value("Portfolio"))
        .andExpect(jsonPath("$[0].year").value(2026))
        .andExpect(jsonPath("$[0].role").value("SOLO"))
        .andExpect(jsonPath("$[0].focus").value("FULL_STACK"))
        .andExpect(jsonPath("$[0].type").value("PERSONAL"))
        .andExpect(jsonPath("$[0].skills[0]").value("React"))
        .andExpect(jsonPath("$[0].skills[1]").value("Spring Boot"))
        .andExpect(jsonPath("$[0].id").doesNotExist());
  }

  @Test
  void getProjectsReturnsEmptyListWhenThereAreNone() throws Exception {
    when(projectService.getProjects()).thenReturn(List.of());

    mockMvc
        .perform(get("/api/projects"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(0));
  }
}
