package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.Session;
import AIMentor.LearnHub.entity.StudentAssignment;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface Maria_StudentAssignment extends JpaRepository<StudentAssignment, Long> {
    Boolean existsBySectionName(String sectionName);
//    List<StudentAssignment> findByVirtualClassRoomAndSectionName(VirtualClassRoom virtualClassRoom, String SectionName);
    List<StudentAssignment> findByVirtualClassRoom(VirtualClassRoom virtualClassRoom);
    void deleteById(Long id);
}
