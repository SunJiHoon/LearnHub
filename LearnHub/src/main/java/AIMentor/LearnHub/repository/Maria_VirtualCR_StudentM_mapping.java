package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Maria_VirtualCR_StudentM_mapping extends JpaRepository<VirtualCR_StudentM_mapping, Long> {
    List<VirtualCR_StudentM_mapping> findByVirtualClassRoom(VirtualClassRoom virtualClassRoom);
    boolean existsByStudentMemberAndVirtualClassRoom(StudentMember studentMember, VirtualClassRoom virtualClassRoom);
    // VirtualCR_StudentM_mapping에서 studentMember와 virtualClassRoom과 일치하는 항목 삭제
    List<VirtualCR_StudentM_mapping> deleteByStudentMemberAndVirtualClassRoom(StudentMember studentMember, VirtualClassRoom virtualClassRoom);
}
