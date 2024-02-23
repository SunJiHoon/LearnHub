package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.sql.Date;

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

    @Column(name = "assignment_creation_date")
    private Date assignmentCreationDate;

    @Column(name = "assignment_due_date")
    private Date assignmentDueDate;

    @Column(name = "section_name")
    private String sectionName;

}
