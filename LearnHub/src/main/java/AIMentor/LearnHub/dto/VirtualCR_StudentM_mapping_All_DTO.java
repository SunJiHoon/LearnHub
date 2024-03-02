package AIMentor.LearnHub.dto;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VirtualCR_StudentM_mapping_All_DTO {
    private Long id;
    private VirtualClassRoom virtualClassRoom;
    private StudentMember studentMember;
}
