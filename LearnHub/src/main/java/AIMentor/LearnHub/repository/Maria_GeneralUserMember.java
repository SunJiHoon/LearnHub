package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.GeneralUserMember;
import AIMentor.LearnHub.entity.StudentMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface Maria_GeneralUserMember extends JpaRepository<GeneralUserMember, Long> {
    Optional<GeneralUserMember> findByLoginId(String loginId);
    Optional<GeneralUserMember> findByEmail(String email);
    List<GeneralUserMember> findByGeneralUserName(String studentName);
    List<GeneralUserMember> findByGeneralUserNameContaining(String query); // 추가

}
