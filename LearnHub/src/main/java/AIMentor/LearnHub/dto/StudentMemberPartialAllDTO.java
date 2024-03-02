package AIMentor.LearnHub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentMemberPartialAllDTO {
    public Long id;
    public String studentName;
    public String email;
}
