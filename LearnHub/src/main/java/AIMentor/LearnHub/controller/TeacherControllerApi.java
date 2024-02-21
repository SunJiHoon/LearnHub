package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.ResultMessageDTO;
import AIMentor.LearnHub.dto.StudentMemberDTO;
import AIMentor.LearnHub.dto.VirtualCR_StudentM_mappingDTO;
//import AIMentor.LearnHub.dto.VirtualCR_StudentM_mappingDTO_selectedStudent_return;
import AIMentor.LearnHub.dto.VirtualClassRoomIdDTO;
import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.entity.VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.service.TeacherService;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import AIMentor.LearnHub.repository.Maria_VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.repository.Maria_VirtualClassRoom;
import AIMentor.LearnHub.session.SessionManager;
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
    TeacherService teacherService;
    SessionManager sessionManager;

    public TeacherControllerApi(
            Maria_TeacherMember maria_teacherMember,
            Maria_VirtualClassRoom mariaVirtualClassRoom,
            Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping,
            Maria_StudentMember mariaStudentMember,
            TeacherService teacherService,
            SessionManager sessionManager
    ) {
        this.maria_teacherMember = maria_teacherMember;
        this.mariaVirtualClassRoom = mariaVirtualClassRoom;
        this.mariaVirtualCRStudentMMapping = mariaVirtualCRStudentMMapping;
        this.mariaStudentMember = mariaStudentMember;
        this.teacherService = teacherService;
        this.sessionManager = sessionManager;
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

//    @PostMapping("/classroom/delete")
//    public ResultMessageDTO doDeleteVClass(
//            @RequestBody VirtualClassRoomIdDTO virtualClassRoomIdDTO,
//            Model model,
//            HttpServletRequest request
//    ){
//        Long VCRoomId = virtualClassRoomIdDTO.getId();
////        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
////        if (teacherMember == null){
////            //로그인 정보 없음
//////            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
////            ResultMessageDTO resultMessageDTO = new ResultMessageDTO();
////            resultMessageDTO.setResult("errorLoginX");
////            return resultMessageDTO;
////        }
////        else{
////            //로그인 되어있음.
//////            model.addAttribute("name", teacherMember.getTeacherName());
////        }
//
//        model.addAttribute("VCRoomId", VCRoomId);
//        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findById(VCRoomId);
//        List<StudentMember> studentMemberArrayList = new ArrayList<>();
//        if (virtualClassRoom.isPresent()) {
//            List<VirtualCR_StudentM_mapping> virtualCRStudentMMapping = mariaVirtualCRStudentMMapping.findByVirtualClassRoom(virtualClassRoom.get());
//            if(!virtualCRStudentMMapping.isEmpty()){
//                ResultMessageDTO resultMessageDTO = new ResultMessageDTO();
//                resultMessageDTO.setResult("errorStudentExist");
////                model.addAttribute("error_message", "학생이 존재합니다. 학생이 없는 class만 삭제할 수 있습니다.");
//                return resultMessageDTO;
//            }
//            else{
//                mariaVirtualClassRoom.deleteById(VCRoomId);
//                ResultMessageDTO resultMessageDTO = new ResultMessageDTO();
//                resultMessageDTO.setResult("success");
//                return resultMessageDTO;
//            }
//        }
//        ResultMessageDTO resultMessageDTO = new ResultMessageDTO();
//        resultMessageDTO.setResult("fail");
//        return resultMessageDTO;
//    }

}
