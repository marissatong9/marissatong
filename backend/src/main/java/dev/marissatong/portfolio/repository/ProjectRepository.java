package dev.marissatong.portfolio.repository;

import dev.marissatong.portfolio.model.Project;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
  // Spring Data builds the query from the method name: all projects, newest year first
  List<Project> findAllByOrderByYearDesc();
}
