package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.TeacherMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Maria_TeacherMember extends JpaRepository<TeacherMember, Long>{
    Optional<TeacherMember> findByLoginId(String loginid);
    Optional<TeacherMember> findByEmail(String email);

}
