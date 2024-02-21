package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.Session;
import AIMentor.LearnHub.entity.StudentMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface Maria_Session extends JpaRepository<Session, Long> {
    Optional<Session> findByUuid(String uuid);
}
