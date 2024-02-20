package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.StudentMemberDTO;
import AIMentor.LearnHub.dto.VirtualCR_StudentM_mappingDTO_selectedStudent;
import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import AIMentor.LearnHub.repository.Maria_VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.repository.Maria_VirtualClassRoom;
import jakarta.servlet.http.HttpServletRequest;
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
        List<StudentMember> studentMembers = mariaStudentMember.findByStudentNameContaining(query);
        List<StudentMemberDTO> studentMemberDTOS = new ArrayList<>();
        for(int i=0;i<studentMembers.size();i++){
            StudentMemberDTO tmpstudentMemberDTO = new StudentMemberDTO();
            tmpstudentMemberDTO.setId(studentMembers.get(i).getId());
            tmpstudentMemberDTO.setEmail(studentMembers.get(i).getEmail());
            tmpstudentMemberDTO.setStudentName(studentMembers.get(i).getStudentName());
            studentMemberDTOS.add(tmpstudentMemberDTO);
        }
        return studentMemberDTOS;
    }

    @PostMapping(value= "/classroom/detail/student/delete")
    public String doDeleteForRemoveStudentFromMapping(
            @RequestBody VirtualCR_StudentM_mappingDTO_selectedStudent virtualCRStudentMMappingDTOSelectedStudent,
            Model model,
            HttpServletRequest request
    ){
        log.info(String.valueOf(virtualCRStudentMMappingDTOSelectedStudent.getSelectedStudent()));

        //fail
        return "success";
    }
}
