package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import AIMentor.LearnHub.repository.Maria_VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.repository.Maria_VirtualClassRoom;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/api/teacher")
public class TeacherControllerApi {
    Maria_TeacherMember maria_teacherMember;
    Maria_VirtualClassRoom mariaVirtualClassRoom;
    Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping;
    Maria_StudentMember mariaStudentMember;
    public TeacherControllerApi(
            Maria_TeacherMember maria_teacherMember,
            Maria_VirtualClassRoom mariaVirtualClassRoom,
            Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping,
            Maria_StudentMember mariaStudentMember
    ) {
        this.maria_teacherMember = maria_teacherMember;
        this.mariaVirtualClassRoom = mariaVirtualClassRoom;
        this.mariaVirtualCRStudentMMapping = mariaVirtualCRStudentMMapping;
        this.mariaStudentMember = mariaStudentMember;
    }

    @GetMapping(value = "/classroom/detail/student/search")
    public List<StudentMemberDTO> teacherRegister(
            @RequestParam("query") String query,
            Model model,
            HttpServletRequest request
    ){
        List<StudentMember> studentMembers = mariaStudentMember.findByStudentName(query);
        List<StudentMemberDTO> studentMemberDTOS = new ArrayList<>();
        for(int i=0;i<studentMembers.size();i++){
            StudentMemberDTO tmpstudentMemberDTO = new StudentMemberDTO();
            tmpstudentMemberDTO.setEmail(studentMembers.get(i).getEmail());
            tmpstudentMemberDTO.setStudentName(studentMembers.get(i).getStudentName());
            studentMemberDTOS.add(tmpstudentMemberDTO);
        }
        return studentMemberDTOS;
    }

}
@Data
class StudentMemberDTO{
    public String studentName;
    public String email;
}
