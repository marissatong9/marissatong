package dev.marissatong.portfolio;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.marissatong.portfolio.model.Project;
import dev.marissatong.portfolio.model.ProjectFocus;
import dev.marissatong.portfolio.model.ProjectRole;
import dev.marissatong.portfolio.model.ProjectType;
import dev.marissatong.portfolio.repository.ProjectRepository;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureMockMvc
class ProjectIntegrationTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ProjectRepository projectRepository;

  @Autowired private JdbcTemplate jdbcTemplate;

  @BeforeEach
  void clearDatabase() {
    projectRepository.deleteAll();
  }

  @Test
  void getProjectsReturnsSavedProjectsNewestYearFirst() throws Exception {
    projectRepository.save(project("Older Project", 2025));
    projectRepository.save(project("Portfolio", 2026));

    mockMvc
        .perform(get("/api/projects"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].title").value("Portfolio"))
        .andExpect(jsonPath("$[0].role").value("SOLO"))
        .andExpect(jsonPath("$[0].skills[0]").value("React"))
        .andExpect(jsonPath("$[1].title").value("Older Project"));
  }

  @Test
  void duplicateTitleIsRejected() {
    projectRepository.saveAndFlush(project("Portfolio", 2026));

    assertThatThrownBy(() -> projectRepository.saveAndFlush(project("Portfolio", 2025)))
        .isInstanceOf(DataIntegrityViolationException.class);
  }

  // Inserts with plain SQL, like a manual insert in Neon, to check the database itself
  // only accepts the enum values (here 'Solo' instead of 'SOLO')
  @Test
  void databaseRejectsRoleNotInEnum() {
    assertThatThrownBy(() ->
            jdbcTemplate.update(
                """
                INSERT INTO project (title, description, year, role)
                VALUES ('Portfolio', 'My personal site.', 2026, 'Solo')
                """))
        .isInstanceOf(DataIntegrityViolationException.class);
  }

  private Project project(String title, int year) {
    Project project = new Project();

    project.setTitle(title);
    project.setDescription("A project description.");
    project.setYear(year);
    project.setRole(ProjectRole.SOLO);
    project.setFocus(ProjectFocus.FULL_STACK);
    project.setType(ProjectType.PERSONAL);
    project.setSkills(List.of("React", "Spring Boot"));

    return project;
  }
}
