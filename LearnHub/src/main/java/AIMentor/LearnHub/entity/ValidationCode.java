package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Table(name = "validation_code")
@Data
public class ValidationCode {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "validation_code")
    private String validationCode;

    @Column(name = "creation_date")
    private Date creationDate;
}
