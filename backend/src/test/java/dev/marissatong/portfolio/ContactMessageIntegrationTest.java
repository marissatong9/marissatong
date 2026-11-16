package dev.marissatong.portfolio;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.marissatong.portfolio.model.ContactMessage;
import dev.marissatong.portfolio.repository.ContactMessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@AutoConfigureMockMvc
class ContactMessageIntegrationTest {

  @Autowired private MockMvc mockMvc;

  @Autowired private ContactMessageRepository contactMessageRepository;

  @BeforeEach
  void clearDatabase() {
    contactMessageRepository.deleteAll();
  }

  @Test
  void validMessageIsSaved() throws Exception {
    mockMvc
        .perform(
            post("/api/contact-message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {"name":"Jane","email":"jane@example.com","message":"Hello, loved your site!"}
                    """))
        .andExpect(status().isCreated());

    assertThat(contactMessageRepository.findAll())
        .singleElement()
        .satisfies((ContactMessage saved) -> {
          assertThat(saved.getId()).isNotNull();
          assertThat(saved.getName()).isEqualTo("Jane");
          assertThat(saved.getEmail()).isEqualTo("jane@example.com");
          assertThat(saved.getMessage()).isEqualTo("Hello, loved your site!");
          assertThat(saved.getCreatedAt()).isNotNull();
        });
  }

  @Test
  void invalidNameIsNotSaved() throws Exception {
    mockMvc
        .perform(
            post("/api/contact-message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {"name":"","email":"jane@example.com","message":"Hello, loved your site!"}
                    """))
        .andExpect(status().isBadRequest());

    assertThat(contactMessageRepository.count()).isZero();
  }

  @Test
  void invalidEmailIsNotSaved() throws Exception {
    mockMvc
        .perform(
            post("/api/contact-message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {"name":"Jane","email":"not-an-email","message":"Hello, loved your site!"}
                    """))
        .andExpect(status().isBadRequest());

    assertThat(contactMessageRepository.count()).isZero();
  }

  @Test
  void invalidMessageIsNotSaved() throws Exception {
    mockMvc
        .perform(
            post("/api/contact-message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {"name":"","email":"not-an-email","message":"hi"}
                    """))
        .andExpect(status().isBadRequest());

    assertThat(contactMessageRepository.count()).isZero();
  }
}
