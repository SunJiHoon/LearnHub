package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.StudentAssignment;
import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Maria_StudentMember extends JpaRepository<StudentMember, Long> {
    Optional<StudentMember> findByLoginId(String loginid);
    Optional<StudentMember> findByEmail(String email);
    List<StudentMember> findByStudentName(String studentName);
    List<StudentMember> findByStudentNameContaining(String query); // 추가

    @Query("SELECT vsm, s, a " +
            "FROM VirtualCR_StudentM_mapping vsm LEFT JOIN vsm.studentMember s LEFT JOIN StudentAssignmentRecord a " +
            "ON vsm.studentMember = a.studentMember " +
            "WHERE vsm.virtualClassRoom = :vsmId and a.studentAssignment = :aId " +
            "GROUP BY s " +
            "HAVING MAX(a.score) = (SELECT MAX(a2.score) FROM StudentAssignmentRecord a2 WHERE a2.studentMember = s)")
    List<Object[]> findStudentMembersWithScoresByVsmIdAndAId(
            @Param("vsmId") VirtualClassRoom vsmId,
            @Param("aId") StudentAssignment aId
            );

}
