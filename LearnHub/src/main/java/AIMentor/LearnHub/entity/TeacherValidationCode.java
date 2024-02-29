package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "teacher_validation_code")
@Data
public class TeacherValidationCode {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name="email")
    private String email;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_member")
    private TeacherMember teacherMember;

    @Column(name = "validation_code")
    private String validationCode;

    @Column(name = "creation_date")
    private Timestamp creationDate;
}
