package AIMentor.LearnHub.repository;

import AIMentor.LearnHub.entity.VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Maria_VirtualCR_StudentM_mapping extends JpaRepository<VirtualCR_StudentM_mapping, Long> {
    List<VirtualCR_StudentM_mapping> findByVirtualClassRoom(VirtualClassRoom virtualClassRoom);
}
