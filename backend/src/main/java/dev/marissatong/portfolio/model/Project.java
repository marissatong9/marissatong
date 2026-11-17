package dev.marissatong.portfolio.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

@Entity
@Getter
@Setter
public class Project {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @CreationTimestamp
  @Column(updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp private LocalDateTime updatedAt;

  @Column(nullable = false, unique = true)
  private String title;

  @Column(nullable = false, columnDefinition = "text")
  private String description;

  @Column(columnDefinition = "text")
  private String context;

  @Column(columnDefinition = "text")
  private String problem;

  @Column(columnDefinition = "text")
  private String approach;

  @Column(columnDefinition = "text")
  private String outcome;

  @Column(nullable = false)
  private Integer year;

  @Enumerated(EnumType.STRING)
  private ProjectRole role;

  @Enumerated(EnumType.STRING)
  private ProjectFocus focus;

  @Enumerated(EnumType.STRING)
  private ProjectType type;

  @JdbcTypeCode(SqlTypes.ARRAY)
  private List<String> skills;
}
