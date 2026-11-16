package dev.marissatong.portfolio.service;

import dev.marissatong.portfolio.dto.ContactMessageRequestDTO;
import dev.marissatong.portfolio.model.ContactMessage;
import dev.marissatong.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactMessageService {
  private final ContactMessageRepository contactMessageRepository;

  public void createContactMessage(ContactMessageRequestDTO contactMessageRequestDTO) {
    ContactMessage contactMessage = new ContactMessage();

    contactMessage.setName(contactMessageRequestDTO.name());
    contactMessage.setEmail(contactMessageRequestDTO.email());
    contactMessage.setMessage(contactMessageRequestDTO.message());

    contactMessageRepository.save(contactMessage);
  }
}
