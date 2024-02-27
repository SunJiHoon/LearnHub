package AIMentor.LearnHub.repository;


import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.entity.TeacherValidationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface Maria_TeacherValidationCode extends JpaRepository<TeacherValidationCode, Long> {
    List<TeacherValidationCode> findByTeacherMemberAndCreationDateBetween(
            TeacherMember teacherMember, Timestamp creationDate, Timestamp creationDate2);
}
