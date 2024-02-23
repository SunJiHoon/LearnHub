package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student_assignment")
@Data
public class StudentAssignment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "virtual_classroom_id") // 외래키 칼럼명
    private VirtualClassRoom virtualClassRoom;

}
