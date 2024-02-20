package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.StudentMemberDTO;
import AIMentor.LearnHub.dto.VirtualCR_StudentM_mappingDTO;
import AIMentor.LearnHub.dto.VirtualCR_StudentM_mappingDTO_selectedStudent_return;
import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import AIMentor.LearnHub.repository.Maria_VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.repository.Maria_VirtualClassRoom;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    @Transactional
    public VirtualCR_StudentM_mappingDTO_selectedStudent_return doDeleteForRemoveStudentFromMapping(
            @RequestBody VirtualCR_StudentM_mappingDTO virtualCRStudentMMappingDTOSelectedStudent,
            Model model,
            HttpServletRequest request
    ){
//        Maria_VirtualClassRoom mariaVirtualClassRoom;
//        Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping;
//        Maria_StudentMember mariaStudentMember;

//        deleteByStudentMemberAndVirtualClassRoom(StudentMember studentMember, VirtualClassRoom virtualClassRoom);
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findById(virtualCRStudentMMappingDTOSelectedStudent.getVCRoomId());
        Optional<StudentMember> studentMember = mariaStudentMember.findById(virtualCRStudentMMappingDTOSelectedStudent.getSelectedStudent());

        if(virtualClassRoom.isEmpty() || studentMember.isEmpty()){
            VirtualCR_StudentM_mappingDTO_selectedStudent_return virtualCR_studentM_mappingDTO_selectedStudent_return = new VirtualCR_StudentM_mappingDTO_selectedStudent_return();
            virtualCR_studentM_mappingDTO_selectedStudent_return.setResult("faile");
            return virtualCR_studentM_mappingDTO_selectedStudent_return;
        }

        List<VirtualCR_StudentM_mapping> mappingsToDelete = mariaVirtualCRStudentMMapping.deleteByStudentMemberAndVirtualClassRoom(studentMember.get(), virtualClassRoom.get());
        mariaVirtualCRStudentMMapping.deleteAll(mappingsToDelete);

        VirtualCR_StudentM_mappingDTO_selectedStudent_return virtualCR_studentM_mappingDTO_selectedStudent_return = new VirtualCR_StudentM_mappingDTO_selectedStudent_return();
        virtualCR_studentM_mappingDTO_selectedStudent_return.setResult("success");
        return virtualCR_studentM_mappingDTO_selectedStudent_return;
    }
}
