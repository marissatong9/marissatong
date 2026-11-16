package dev.marissatong.portfolio.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import dev.marissatong.portfolio.service.ContactMessageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ContactMessageController.class)
class ContactMessageControllerTest {

  @Autowired private MockMvc mockMvc;

  @MockitoBean private ContactMessageService contactMessageService;

  @Test
  void validMessageReturns201() throws Exception {
    mockMvc
        .perform(
            post("/api/contact-message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {"name":"Jane","email":"jane@example.com","message":"Hello, loved your site!"}
                    """))
        .andExpect(status().isCreated());

    verify(contactMessageService).createContactMessage(any());
  }

  @Test
  void inavlidNameReturns400AndIsNotSaved() throws Exception {
    mockMvc
        .perform(
            post("/api/contact-message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {"name":"","email":"jane@example.com","message":"Hello, loved your site!"}
                    """))
        .andExpect(status().isBadRequest());

    verify(contactMessageService, never()).createContactMessage(any());
  }

  @Test
  void invalidEmailReturns400AndIsNotSaved() throws Exception {
    mockMvc
        .perform(
            post("/api/contact-message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {"name":"Jane","email":"not-an-email","message":"Hello, loved your site!"}
                    """))
        .andExpect(status().isBadRequest());

    verify(contactMessageService, never()).createContactMessage(any());
  }

  @Test
  void invalidMessageReturns400AndIsNotSaved() throws Exception {
    mockMvc
        .perform(
            post("/api/contact-message")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {"name":"Jane","email":"jane@example.com","message":""}
                    """))
        .andExpect(status().isBadRequest());

    verify(contactMessageService, never()).createContactMessage(any());
  }
}
