package dev.marissatong.portfolio.repository;

import dev.marissatong.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
  // Leaving empty for basic saving, reading and deleting capabilities
}
