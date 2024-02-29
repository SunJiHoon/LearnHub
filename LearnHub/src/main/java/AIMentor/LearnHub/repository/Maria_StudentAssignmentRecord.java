package AIMentor.LearnHub.repository;


import AIMentor.LearnHub.entity.StudentAssignment;
import AIMentor.LearnHub.entity.StudentAssignmentRecord;
import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Maria_StudentAssignmentRecord extends JpaRepository<StudentAssignmentRecord, Long> {
    //    private StudentMember studentMember;
    //
    //    @ManyToOne(fetch = FetchType.LAZY)
    //    @JoinColumn(name = "assignment_id") // 외래키 칼럼명
    //    private StudentAssignment studentAssignment;
    List<StudentAssignmentRecord> findByStudentMemberAndStudentAssignment(
            StudentMember studentMember, StudentAssignment studentAssignment);
}
