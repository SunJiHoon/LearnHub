package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.Session;
import AIMentor.LearnHub.entity.StudentAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface Maria_StudentAssignment extends JpaRepository<StudentAssignment, Long> {
    Boolean existsBySectionName(String sectionName);
}
