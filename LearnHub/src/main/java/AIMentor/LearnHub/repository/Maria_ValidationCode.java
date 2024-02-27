package AIMentor.LearnHub.repository;


import AIMentor.LearnHub.entity.ValidationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface Maria_ValidationCode extends JpaRepository<ValidationCode, Long> {
    List<ValidationCode> findByValidationCodeAndCreationDateBetween(
            String validationCode, Date creationDate, Date creationDate2);
}
