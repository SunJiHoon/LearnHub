package AIMentor.LearnHub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentMemberWithScoreDTO {
    private Long id;
    private String studentName;
    private String email;
    private Integer score;
}
