package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "general_user_member")
@Data
public class GeneralUserMember {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "login_pwd")
    private String loginPwd;//Bcript를 통해 암호화할 예정.

    @Column(name = "general_user_name")
    private String generalUserName;

    @Column(name = "email")
    private String email;

}
