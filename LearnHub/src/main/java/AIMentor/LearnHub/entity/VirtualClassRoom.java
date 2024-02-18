package AIMentor.LearnHub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "virtual_class_room")
@Data
public class VirtualClassRoom {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "class_name")
    private String className;

    @Column(name = "subject")
    private String subject;

    @Column(name = "maximum_number")
    private int maximumNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_member_id") // 외래키 칼럼명
    private TeacherMember teacherMember;

//    @Column(name = "filename")
//    private String filename;
//
//    @Column(name = "uploaded_path")
//    private String uploadedPath;
}
