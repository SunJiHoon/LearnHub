package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "virtualcr_studentm_mapping")
@Data
public class VirtualCR_StudentM_mapping {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "virtual_class_room") // 외래키 칼럼명
    private VirtualClassRoom virtualClassRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_member") // 외래키 칼럼명
    private StudentMember studentMember;
}
