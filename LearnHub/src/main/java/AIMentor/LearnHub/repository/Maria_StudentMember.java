package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.TeacherMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Maria_StudentMember extends JpaRepository<StudentMember, Long> {
    Optional<StudentMember> findByLoginId(String loginid);
    Optional<StudentMember> findByEmail(String email);
    List<StudentMember> findByStudentName(String studentName);
}
