package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.StudentMemberDTO;
import AIMentor.LearnHub.entity.*;
import AIMentor.LearnHub.repository.*;
import AIMentor.LearnHub.service.StudentService;
import AIMentor.LearnHub.session.SessionManager;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@AllArgsConstructor
@RequestMapping(value = "/student")
@Slf4j
public class StudentController {

    Maria_StudentMember mariaStudentMember;
    SessionManager sessionManager;
    Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping;
    StudentService studentService;
    Maria_VirtualClassRoom mariaVirtualClassRoom;
    Maria_StudentAssignment mariaStudentAssignment;
    Maria_StudentAssignmentRecord mariaStudentAssignmentRecord;

    //@AllArgsConstructor 생성자 대체함.
//    public StudentController(
//            Maria_StudentMember mariaStudentMember,
//            SessionManager sessionManager,
//            Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping,
//            StudentService studentService
//) {
//        this.mariaStudentMember = mariaStudentMember;
//        this.sessionManager = sessionManager;
//        this.mariaVirtualCRStudentMMapping = mariaVirtualCRStudentMMapping;
//        this.studentService = studentService;
//    }

    @GetMapping(value = "/register")
    String teacherRegister(){
        return "student/register";
    }

    @PostMapping(value = "/register")
    String DoteacherRegister(
            @RequestParam(name = "login_id") String login_id,
            @RequestParam(name = "login_pwd") String login_pwd,
            @RequestParam(name = "student_name") String student_name,
            @RequestParam(name = "email") String email,
            Model model
    ){
        StudentMember newStudentMember = new StudentMember();
        newStudentMember.setLoginId(login_id);
        newStudentMember.setLoginPwd(login_pwd);
        newStudentMember.setStudentName(student_name);
        newStudentMember.setEmail(email);
        if (newStudentMember.getLoginId().isEmpty() ||
                newStudentMember.getLoginPwd().isEmpty() ||
                newStudentMember.getStudentName().isEmpty() ||
                newStudentMember.getEmail().isEmpty()
        ){
            model.addAttribute("error_message", "입력값이 비었습니다.");
            return "student/register";
        }
        else if(mariaStudentMember.findByLoginId(login_id).isPresent()){
            model.addAttribute("error_message", "이미 가입 이력이 있는 id입니다.");
            return "student/register";
        }
        else if(mariaStudentMember.findByEmail(email).isPresent()){
            model.addAttribute("error_message", "이미 가입 이력이 있는 email입니다.");
            return "student/register";
        }
        mariaStudentMember.save(newStudentMember);
        model.addAttribute("register", "학생 회원가입 완료.");
        //return "redirect:/";
        return "index";
    }

    @GetMapping(value = "/login")
    String giveMeLoginPage(
            Model model,
            HttpServletRequest request
    ){
        StudentMember studentMember = sessionManager.getStudentCookieAndReading(request);
        if (studentMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "student/login";
        }
        else{
            return "redirect:/student/mypage";
        }
    }

    @PostMapping(value = "/login")
    String loginProcess(
            @RequestParam(name = "login_id") String login_id,
            @RequestParam(name = "login_pwd") String login_pwd,
            Model model,
            HttpServletResponse response
    ){
        Optional<StudentMember> loginStudentMember = mariaStudentMember.findByLoginId(login_id);

        if(loginStudentMember.isEmpty()){
            model.addAttribute("error_message", "일치하는 id가 없습니다.");
            return "student/login";
        }
        else{
            StudentMember realStudentMember = loginStudentMember.get();
            if(realStudentMember.getLoginPwd().equals(login_pwd)){
                model.addAttribute("register",
                        realStudentMember.getStudentName() +"님 안녕하세요. "
                                +"로그인 되었습니다.");
                sessionManager.createStudentSession(String.valueOf(realStudentMember.getId()), response);
                return "redirect:/student/mypage";
            }
            else{
                model.addAttribute("error_message", "비밀번호가 틀렸습니다.");
                return "student/login";
            }
        }
    }

    @PostMapping("/logout")
    public String logout(
            HttpServletResponse response
    ) {
        expireCookie(response, "studentId");
        return "redirect:/";
    }
    private void expireCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }


    @GetMapping("/mypage")
    public String getMyPageInStudent(
            Model model,
            HttpServletRequest request
    ) {
        StudentMember studentMember = sessionManager.getStudentCookieAndReading(request);
        if (studentMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", studentMember.getStudentName());
        }

        List<VirtualClassRoom> studentsVirtualClassRoomList = studentService.getStudentsClasses(studentMember);
        model.addAttribute("studentsVirtualClassRooms", studentsVirtualClassRoomList);

        return "student/mypage";
    }
    @GetMapping("/classroom/detail")
    public String getDeatailPage(
            @RequestParam(name = "className") String className,
            @RequestParam(name = "uuid") String uuid,
            Model model,
            HttpServletRequest request
    ){
        StudentMember studentMember = sessionManager.getStudentCookieAndReading(request);
        if (studentMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", studentMember.getStudentName());
        }

        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findByUuid(uuid);
        if(virtualClassRoom.isEmpty()){
            model.addAttribute("error_message", "해당하는 VCR이 존재하지 않습니다.");
            return "index";
        }
        model.addAttribute("VCRoom", virtualClassRoom.get());
        model.addAttribute("class_name", className);
        model.addAttribute("the_num_of_students", virtualClassRoom.get().getVirtualCRStudentMMappingArrayList().size());
        model.addAttribute("students_maximum_number", virtualClassRoom.get().getMaximumNumber());
        return "student/classroom/detail";
    }

    @GetMapping("/classroom/student/list")
    public String getStudentListPageWithPost(
//            @RequestParam(name = "VCRoomId") Long vCRoomId,
            @RequestParam(name = "className") String className,
            @RequestParam(name = "uuid") String uuid,
            Model model,
            HttpServletRequest request
    ){
        StudentMember studentMember = sessionManager.getStudentCookieAndReading(request);
        if (studentMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", studentMember.getStudentName());
        }
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findByUuid(uuid);
        if(virtualClassRoom.isEmpty()){
            model.addAttribute("error_message", "해당하는 VCR이 존재하지 않습니다.");
            return "index";
        }
        List<StudentMemberDTO> studentMemberArrayList = new ArrayList<>();

        List<VirtualCR_StudentM_mapping> virtualCRStudentMMapping = mariaVirtualCRStudentMMapping.findByVirtualClassRoom(virtualClassRoom.get());
        for (VirtualCR_StudentM_mapping virtualCR_studentM_mapping : virtualCRStudentMMapping) {
            StudentMemberDTO tempStudentMemberDTO = new StudentMemberDTO();
            tempStudentMemberDTO.setId(virtualCR_studentM_mapping.getStudentMember().getId());
            tempStudentMemberDTO.setStudentName(virtualCR_studentM_mapping.getStudentMember().getStudentName());
            tempStudentMemberDTO.setEmail(virtualCR_studentM_mapping.getStudentMember().getEmail());
            studentMemberArrayList.add(tempStudentMemberDTO);
        }
        model.addAttribute("studentMemberArrayList",studentMemberArrayList);
        model.addAttribute("className", className);
        model.addAttribute("uuid", uuid);
        log.info(className);
        return "student/classroom/student/list";
    }
    @GetMapping("/classroom/assignment/list")
    public String getAssignmentListPageWithPost(
            @RequestParam(name = "className") String className,
            @RequestParam(name = "uuid") String uuid,
            Model model,
            HttpServletRequest request
    ){
        StudentMember studentMember = sessionManager.getStudentCookieAndReading(request);
        if (studentMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", studentMember.getStudentName());
        }
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findByUuid(uuid);
        if(virtualClassRoom.isEmpty()){
            model.addAttribute("error_message", "해당하는 VCR이 존재하지 않습니다.");
            return "index";
        }
        List<StudentAssignment> studentAssignmentList = mariaStudentAssignment.findByVirtualClassRoom(virtualClassRoom.get());
        model.addAttribute("student_assignment_list" ,studentAssignmentList);
        model.addAttribute("class_name", className);
        model.addAttribute("uuid", uuid);

//        log.info(className);
        return "student/classroom/assignment/list";
    }

    @GetMapping("/classroom/assignment/detail")
    public String getDetailPageAssignment(
            @RequestParam(name = "selectedSectionId") Long selectedSectionId,
            @RequestParam(name = "className") String className,
            @RequestParam(name = "uuid") String uuid,
            Model model,
            HttpServletRequest request
    ){
        StudentMember studentMember = sessionManager.getStudentCookieAndReading(request);
        if (studentMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", studentMember.getStudentName());
        }
        Optional<StudentAssignment> studentAssignment = mariaStudentAssignment.findById(selectedSectionId);
        if (studentAssignment.isEmpty()){
            model.addAttribute("error_message", "해당하는 과제 정보가 존재하지 않습니다.");
        }

        model.addAttribute("assignment_id",studentAssignment.get().getId());
        model.addAttribute("section_name",studentAssignment.get().getSectionName());
        model.addAttribute("assignment_creation_date",studentAssignment.get().getAssignmentCreationDate());
        model.addAttribute("assignment_due_date",studentAssignment.get().getAssignmentDueDate());
//            model.addAttribute("virtual_class_room",studentAssignment.get().getVirtualClassRoom());
        model.addAttribute("class_name", className);
        model.addAttribute("uuid", uuid);

        return "student/classroom/assignment/detail";
    }
    @PostMapping("/classroom/assignment/do")
    public String postDoAssignment(
            @RequestParam(name = "selectedSectionId") Long selectedSectionId,
            @RequestParam(name = "className") String className,
            @RequestParam(name = "uuid") String uuid,
            Model model,
            HttpServletRequest request
    ){
        StudentMember studentMember = sessionManager.getStudentCookieAndReading(request);
        if (studentMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", studentMember.getStudentName());
        }
        Optional<StudentAssignment> studentAssignment = mariaStudentAssignment.findById(selectedSectionId);
        if (studentAssignment.isEmpty()){
            model.addAttribute("error_message", "해당하는 과제 정보가 존재하지 않습니다.");
        }

        //과제를 제출했다.
        int score = 70;//임시로 70점을 부여함
        Timestamp assignmentSubmitTime = new Timestamp(System.currentTimeMillis());
//        assignmentSubmitTime.getTime();
        //studentMember는 쿠키로 알고 있다.
        //studentAssignment는 위에서 구했다.
        StudentAssignmentRecord studentAssignmentRecord = new StudentAssignmentRecord();
        studentAssignmentRecord.setScore(score);
        studentAssignmentRecord.setAssignmentSubmitTime(assignmentSubmitTime);
        studentAssignmentRecord.setStudentMember(studentMember);
        studentAssignmentRecord.setStudentAssignment(studentAssignment.get());
        mariaStudentAssignmentRecord.save(studentAssignmentRecord);

        model.addAttribute("class_name", className);
        model.addAttribute("uuid", uuid);

        return "student/classroom/assignment/do";
    }
}
