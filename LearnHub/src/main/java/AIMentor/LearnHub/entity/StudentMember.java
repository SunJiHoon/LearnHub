package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "student_member")
@Data
public class StudentMember {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "login_pwd")
    private String loginPwd;//Bcript를 통해 암호화할 예정.

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "email")
    private String email;

}
