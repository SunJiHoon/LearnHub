package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Table(name = "student_assignment_record")
@Data
public class StudentAssignmentRecord {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id") // 외래키 칼럼명
    private StudentMember studentMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id") // 외래키 칼럼명
    private StudentAssignment studentAssignment;

    @Column(name = "assignment_submit_time")
    private Timestamp assignmentSubmitTime;

    @Column(name = "score")
    private int score;
}
