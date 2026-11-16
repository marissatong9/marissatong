package dev.marissatong.portfolio.controller;

import dev.marissatong.portfolio.dto.ContactMessageRequestDTO;
import dev.marissatong.portfolio.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contact-message")
public class ContactMessageController {

  private final ContactMessageService contactMessageService;

  @PostMapping
  public ResponseEntity<Void> createContactMessage(
      @Valid @RequestBody ContactMessageRequestDTO contactMessageRequestDTO) {
    contactMessageService.createContactMessage(contactMessageRequestDTO);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }
}
