package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "student_validation_code")
@Data
public class StudentValidationCode {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="email")
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_member")
    private StudentMember studentMember;

    @Column(name = "validation_code")
    private String validationCode;

    @Column(name = "creation_date")
    private Timestamp creationDate;

}
