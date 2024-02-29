package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.StudentValidationCode;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.entity.TeacherValidationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface Maria_StudentValidationCode extends JpaRepository<StudentValidationCode, Long> {
    List<StudentValidationCode> findByStudentMemberAndCreationDateBetween(
            StudentMember studentMember, Timestamp creationDate, Timestamp creationDate2);

}
