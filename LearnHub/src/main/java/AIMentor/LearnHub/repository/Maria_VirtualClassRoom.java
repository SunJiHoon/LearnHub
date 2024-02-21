package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Maria_VirtualClassRoom extends JpaRepository<VirtualClassRoom, Long> {
    Optional<VirtualClassRoom> findByClassNameAndTeacherMember(String classname, TeacherMember teacherMember);
    List<VirtualClassRoom> findByTeacherMember(TeacherMember teacherMember);
    void deleteById(Long id);

}
