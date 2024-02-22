package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.ResultMessageDTO;
import AIMentor.LearnHub.dto.VirtualCR_StudentM_mappingDTO;
import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.entity.VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import AIMentor.LearnHub.repository.*;
import AIMentor.LearnHub.service.TeacherService;
import AIMentor.LearnHub.session.SessionManager;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import AIMentor.LearnHub.utility.Utility;

@Controller
@RequestMapping(value = "/teacher")
@Slf4j
public class TeacherController {
    Utility utility = new Utility();
    Maria_TeacherMember maria_teacherMember;
    Maria_VirtualClassRoom mariaVirtualClassRoom;
    Maria_StudentMember mariaStudentMember;
    Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping;
    Maria_Session mariaSession;
    SessionManager sessionManager;
    TeacherService teacherService;
    public TeacherController(
            Maria_TeacherMember maria_teacherMember,
            Maria_VirtualClassRoom mariaVirtualClassRoom,
            Maria_StudentMember mariaStudentMember,
            Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping,
            Maria_Session mariaSession,
            SessionManager sessionManager,
            TeacherService teacherService
    ) {
        this.maria_teacherMember = maria_teacherMember;
        this.mariaVirtualClassRoom = mariaVirtualClassRoom;
        this.mariaStudentMember = mariaStudentMember;
        this.mariaVirtualCRStudentMMapping = mariaVirtualCRStudentMMapping;
        this.mariaSession = mariaSession;
        this.sessionManager = sessionManager;
        this.teacherService = teacherService;
    }

    @GetMapping(value = "/register")
    String teacherRegister(){
        return "teacher/register";
    }
    @PostMapping(value = "/register")
    String DoteacherRegister(
            @RequestParam(name = "login_id") String login_id,
            @RequestParam(name = "login_pwd") String login_pwd,
            @RequestParam(name = "teacher_name") String teacher_name,
            @RequestParam(name = "email") String email,
            Model model
    ){
        TeacherMember newteacherMember = new TeacherMember();
        newteacherMember.setLoginId(login_id);
        newteacherMember.setLoginPwd(login_pwd);
        newteacherMember.setTeacherName(teacher_name);
        newteacherMember.setEmail(email);
        if (newteacherMember.getLoginId().isEmpty() ||
                newteacherMember.getLoginPwd().isEmpty() ||
                newteacherMember.getTeacherName().isEmpty() ||
                newteacherMember.getEmail().isEmpty()
        ){
            model.addAttribute("error_message", "입력값이 비었습니다.");
            return "teacher/register";
        }
        else if(maria_teacherMember.findByLoginId(login_id).isPresent()){
            model.addAttribute("error_message", "이미 가입 이력이 있는 id입니다.");
            return "teacher/register";
        }
        else if(maria_teacherMember.findByEmail(email).isPresent()){
            model.addAttribute("error_message", "이미 가입 이력이 있는 email입니다.");
            return "teacher/register";
        }
        maria_teacherMember.save(newteacherMember);
        model.addAttribute("register", "선생님 회원가입 완료.");
        //return "redirect:/";
        return "/index";
    }

    @GetMapping(value = "/login")
    String giveMeLoginPage(
            Model model,
            HttpServletRequest request
    ){
        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "teacher/login";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
            return "redirect:/teacher/mypage";
        }
    }

    @PostMapping(value = "/login")
    String loginProcess(
            @RequestParam(name = "login_id") String login_id,
            @RequestParam(name = "login_pwd") String login_pwd,
            Model model,
            HttpServletResponse response
    ){
        Optional<TeacherMember> loginTeacherMember = maria_teacherMember.findByLoginId(login_id);

        if(loginTeacherMember.isEmpty()){
            model.addAttribute("error_message", "일치하는 id가 없습니다.");
            return "teacher/login";
        }
        else{
            TeacherMember realTeacherMember = loginTeacherMember.get();
            if(realTeacherMember.getLoginPwd().equals(login_pwd)){
                model.addAttribute("register",
                        realTeacherMember.getTeacherName() +"님 안녕하세요. "
                +"로그인 되었습니다.");

//                Cookie idCookie = new Cookie("teacherId",
//                        );
//                response.addCookie(idCookie);
//                SessionManager sessionManager = new SessionManager(mariaSession, maria_teacherMember, mariaStudentMember);
//                Maria_Session mariaSession,
//                Maria_TeacherMember maria_teacherMember,
//                Maria_StudentMember mariaStudentMember

                sessionManager.createTeacherSession(String.valueOf(realTeacherMember.getId()), response);
                return "redirect:/teacher/mypage";
            }
            else{
                model.addAttribute("error_message", "비밀번호가 틀렸습니다.");
                return "teacher/login";
            }
        }
    }

    @PostMapping("/logout")
    public String logout(
            HttpServletResponse response
    ) {
        expireCookie(response, "teacherId");
        return "redirect:/";
    }
    private void expireCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }


    @GetMapping("/mypage")
    public String getMyPage(
            Model model,
            HttpServletRequest request
    ) {
        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }

        List<VirtualClassRoom> teachersVirtualClassRoomList = mariaVirtualClassRoom.findByTeacherMember(teacherMember);
//        List<VirtualClassRoom> teachersVirtualClassRoomList = mariaVirtualClassRoom.findAll();
        model.addAttribute("teachersVirtualClassRooms", teachersVirtualClassRoomList);

        return "teacher/mypage";
    }

    @GetMapping("/classroom/make")
    public String getClassroomMakePage(){
        return "teacher/classroom/make";
    }

    @PostMapping("/classroom/make")
    public String doClassroomMakePage(
            @RequestParam(name = "class_name") String class_name,
            @RequestParam(name = "subject") String subject,
            @RequestParam(name = "maximum_number") int maximum_number,
            Model model,
            HttpServletRequest request) {
//        SessionManager sessionManager = new SessionManager(mariaSession, maria_teacherMember, mariaStudentMember);
        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }

        if(class_name.isEmpty() || subject.isEmpty()){
            model.addAttribute("error_message", "class_name과 subject이름에 이상이 있습니다.");
            return "teacher/classroom/make";
        }


        Optional<VirtualClassRoom> exisitingVirtualClassRoom = mariaVirtualClassRoom.findByClassNameAndTeacherMember(class_name, teacherMember);
        if(exisitingVirtualClassRoom.isPresent()){
            model.addAttribute("error_message", "이미 존재하는 className입니다.");
            return "teacher/classroom/make";
        }
        VirtualClassRoom virtualClassRoom = new VirtualClassRoom();
        virtualClassRoom.setClassName(class_name);
        virtualClassRoom.setSubject(subject);
        virtualClassRoom.setMaximumNumber(maximum_number);
        virtualClassRoom.setTeacherMember(teacherMember);
        mariaVirtualClassRoom.save(virtualClassRoom);
        model.addAttribute("created_class_name", teacherMember.getTeacherName());

        List<VirtualClassRoom> teachersVirtualClassRoomList = mariaVirtualClassRoom.findByTeacherMember(teacherMember);
        model.addAttribute("teachersVirtualClassRooms", teachersVirtualClassRoomList);

        return "teacher/mypage";
    }

    @PostMapping("/classroom/student/add")
    public String doAddStudent(
//            @RequestParam("selectedStudent") String selectedStudent,
//            @RequestParam("VCRoomId") String VCRoomId,
            @RequestBody VirtualCR_StudentM_mappingDTO virtualCRStudentMMappingDTO,
            Model model,
            HttpServletRequest request
    ){
//        Long selectedStudentIdLong = Long.getLong(selectedStudent);
//        Long VCRoomIdLong = Long.getLong(VCRoomId);
        Long selectedStudentIdLong = virtualCRStudentMMappingDTO.getSelectedStudent();
        String className = virtualCRStudentMMappingDTO.getClassName();
//        SessionManager sessionManager = new SessionManager(mariaSession, maria_teacherMember, mariaStudentMember);

        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }
        Optional<StudentMember> studentMember = mariaStudentMember.findById(selectedStudentIdLong);
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findByClassNameAndTeacherMember(className, teacherMember);
        if (studentMember.isPresent() && virtualClassRoom.isPresent()){
            if (mariaVirtualCRStudentMMapping.existsByStudentMemberAndVirtualClassRoom(studentMember.get(), virtualClassRoom.get())){
                //중복이 존재할 경우
                model.addAttribute("error_message", "이미 추가 되어있는 학생입니다.");
                return "/teacher/classroom/student/add";
            }
            else{
                //중복이 없는 경우
                //model.addAttribute("VCRoomId", studentMember.get());
                VirtualCR_StudentM_mapping virtualCRStudentMMapping = new VirtualCR_StudentM_mapping();
                //virtualCRStudentMMapping.setVirtualClassRoom();
                virtualCRStudentMMapping.setStudentMember(studentMember.get());
                virtualCRStudentMMapping.setVirtualClassRoom(virtualClassRoom.get());
                mariaVirtualCRStudentMMapping.save(virtualCRStudentMMapping);
                model.addAttribute("result_message", "추가에 성공했습니다.");
                model.addAttribute("added_student_name", studentMember.get().getStudentName());
                return "/teacher/classroom/student/add";
            }
        }
        model.addAttribute("error_message", "추가에 실패했습니다. 웹을 새로 시작해주세요.");
        return "/teacher/classroom/student/add";
    }
    @GetMapping("/classroom/detail")
    public String getDeatailPageWithPost(
//            @RequestParam(name = "VCRoomId") Long vCRoomId,
            @RequestParam(name = "className") String className,
            Model model,
            HttpServletRequest request
    ){
         TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
         if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findByClassNameAndTeacherMember(className, teacherMember);
        if(virtualClassRoom.isEmpty()){
            model.addAttribute("error_message", "해당하는 VCR이 존재하지 않습니다.");
            return "index";
        }
//        virtualClassRoom.get();
//        model.addAttribute("VCRoomId", vCRoomId);
//        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findById(vCRoomId);
        List<StudentMember> studentMemberArrayList = new ArrayList<>();
        if (virtualClassRoom.isPresent()){
            List<VirtualCR_StudentM_mapping> virtualCRStudentMMapping = mariaVirtualCRStudentMMapping.findByVirtualClassRoom(virtualClassRoom.get());
            for(int i=0;i<virtualCRStudentMMapping.size();i++){
                studentMemberArrayList.add(virtualCRStudentMMapping.get(i).getStudentMember());
            }
        }

//        model.addAttribute("VCRoomId", vCRoomId);
        model.addAttribute("studentMemberArrayList",studentMemberArrayList);
        model.addAttribute("className", className);
        log.info(className);
        return "teacher/classroom/detail";
    }


    //@PostMapping(value= "/classroom/student/delete")
    public String doDeleteForRemoveStudentFromMapping(
            @RequestBody VirtualCR_StudentM_mappingDTO virtualCRStudentMMappingDTO,
//            @RequestParam(name = "className") String className,
//            @RequestParam(name = "selectedStudent") String selectedStudent,
            Model model,
            HttpServletRequest request
    ){
        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }
        String className = virtualCRStudentMMappingDTO.getClassName();
        Optional<StudentMember> studentMember = mariaStudentMember.findById(virtualCRStudentMMappingDTO.getSelectedStudent());
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findByClassNameAndTeacherMember(className, teacherMember);

        if(virtualClassRoom.isEmpty() || studentMember.isEmpty()){
            ResultMessageDTO virtualCR_studentM_mappingDTO_selectedStudent_return = new ResultMessageDTO();
            virtualCR_studentM_mappingDTO_selectedStudent_return.setResult("faile");
            model.addAttribute("error_message", "빈 객체 입니다.");
//            model.addAttribute("className", className);
//            return "redirect:/teacher/classroom/detail?className=" + className;
            return "/teacher/classroom/student/delete";

        }
        teacherService.deleteSelectedStudentFromMappingTable(studentMember.get(), virtualClassRoom.get());
        model.addAttribute("className", className );
//        return "redirect:/teacher/classroom/detail?className=" + className;
        return "/teacher/classroom/student/delete";
    }



//    @PostMapping("/classroom/delete")
//    public String doDeleteVClass(
//            @RequestBody VirtualClassRoomIdDTO virtualClassRoomIdDTO,
//            Model model,
//            HttpServletRequest request
//    ){
//        Long VCRoomId = virtualClassRoomIdDTO.getId();
//        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
//        if (teacherMember == null){
//            ResultMessageDTO resultMessageDTO = new ResultMessageDTO();
//            resultMessageDTO.setResult("errorLoginX");
//            return "redirect:teacher/classroom/detail?VCRoomId=" + virtualClassRoomIdDTO.getId();
//        }
//        else{
//            //로그인 되어있음.
////            model.addAttribute("name", teacherMember.getTeacherName());
//        }
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


    @GetMapping("/classroom/student/detail")
    public String getDeatailPageStudent(
            @RequestParam(name = "selectedStudent") Long selectedStudent,
            @RequestParam(name = "className") String className,
            Model model,
            HttpServletRequest request
    ){
        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }

        Optional<StudentMember> studentMember = mariaStudentMember.findById(selectedStudent);
        if (studentMember.isEmpty()){
            model.addAttribute("error_message", "해당하는 학생 정보가 존재하지 않습니다.");
        }

        if (studentMember.isPresent()){
            model.addAttribute("StudentName",studentMember.get().getStudentName());
            model.addAttribute("Email",studentMember.get().getEmail());
            model.addAttribute("selectedStudent",studentMember.get().getId());

        }
        model.addAttribute("className", className);
        log.info(className);
        return "teacher/classroom/student/detail";
    }

    @PostMapping("/classroom/student/delete")
    public String removeStudentFromMappingTable(
            @RequestParam(name = "selectedStudent") Long selectedStudent,
            @RequestParam(name = "className") String className,
            Model model,
            HttpServletRequest request
    ){
        TeacherMember teacherMember = sessionManager.getTeacherCookieAndReading(request);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }

        Optional<StudentMember> studentMember = mariaStudentMember.findById(selectedStudent);
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findByClassNameAndTeacherMember(className, teacherMember);

        if(virtualClassRoom.isEmpty() || studentMember.isEmpty()){
            ResultMessageDTO virtualCR_studentM_mappingDTO_selectedStudent_return = new ResultMessageDTO();
            virtualCR_studentM_mappingDTO_selectedStudent_return.setResult("faile");
            model.addAttribute("error_message", "빈 객체 입니다.");
//            model.addAttribute("className", className);
//            return "redirect:/teacher/classroom/detail?className=" + className;
            return "/teacher/classroom/student/delete";
        }
        teacherService.deleteSelectedStudentFromMappingTable(studentMember.get(), virtualClassRoom.get());
        model.addAttribute("className", className );
//        return "redirect:/teacher/classroom/detail?className=" + className;
        return "redirect:/teacher/classroom/detail?className="+className;
    }

}
