package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "teacher_member")
@Data
public class TeacherMember {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "login_pwd")
    private String loginPwd;//Bcript를 통해 암호화할 예정.

    @Column(name = "teacher_name")
    private String teacherName;

    @Column(name = "email")
    private String email;

    //class는 여러개 만들 수 있다고 가정.

/*
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "registration_date")
    private Timestamp registrationDate;

    @Column(name = "last_login_date")
    private String lastLoginDate;

    @Column(name = "account_status")
    private String accountStatus;
 */
}
