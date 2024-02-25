package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "session")
@Data
public class Session {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "uuid")
    private String uuid;


}
