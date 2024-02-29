package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.ResultMessageDTO;
import AIMentor.LearnHub.dto.StudentMemberDTO;
import AIMentor.LearnHub.dto.VirtualCR_StudentM_mappingDTO;
import AIMentor.LearnHub.entity.*;
import AIMentor.LearnHub.repository.*;
import AIMentor.LearnHub.service.StudentAssignmentService;
import AIMentor.LearnHub.service.StudentService;
import AIMentor.LearnHub.service.TeacherService;
import AIMentor.LearnHub.session.SessionManager;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import AIMentor.LearnHub.utility.Utility;

@Controller
@RequestMapping(value = "/teacher")
@Slf4j
@AllArgsConstructor
public class TeacherController {
    Maria_TeacherMember maria_teacherMember;
    Maria_VirtualClassRoom mariaVirtualClassRoom;
    Maria_StudentMember mariaStudentMember;
    Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping;
    Maria_Session mariaSession;
    SessionManager sessionManager;
    TeacherService teacherService;
    Maria_StudentAssignment mariaStudentAssignment;
    StudentAssignmentService studentAssignmentService;
    Maria_StudentAssignmentRecord mariaStudentAssignmentRecord;
//    public TeacherController(
//            Maria_TeacherMember maria_teacherMember,
//            Maria_VirtualClassRoom mariaVirtualClassRoom,
//            Maria_StudentMember mariaStudentMember,
//            Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping,
//            Maria_Session mariaSession,
//            SessionManager sessionManager,
//            TeacherService teacherService,
//            Maria_StudentAssignment mariaStudentAssignment,
//            StudentAssignmentService studentAssignmentService
//    ) {
//        this.maria_teacherMember = maria_teacherMember;
//        this.mariaVirtualClassRoom = mariaVirtualClassRoom;
//        this.mariaStudentMember = mariaStudentMember;
//        this.mariaVirtualCRStudentMMapping = mariaVirtualCRStudentMMapping;
//        this.mariaSession = mariaSession;
//        this.sessionManager = sessionManager;
//        this.teacherService = teacherService;
//        this.mariaStudentAssignment = mariaStudentAssignment;
//        this.studentAssignmentService = studentAssignmentService;
//    }

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
        return "index";
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
    public String getClassroomMakePage(
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
        virtualClassRoom.setUuid(UUID.randomUUID().toString());
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
        model.addAttribute("class_name", className);
        model.addAttribute("the_num_of_students", virtualClassRoom.get().getVirtualCRStudentMMappingArrayList().size());
        model.addAttribute("students_maximum_number", virtualClassRoom.get().getMaximumNumber());
        return "teacher/classroom/detail";
    }
    @PostMapping("/classroom/delete")
    public String deleteClassRoomWithPost(
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

        try{
            teacherService.deleteClassroomByClassNameAndTeacherMember(className, teacherMember, model);
        }
        catch (DataIntegrityViolationException e){
            model.addAttribute("error_message", "해당 클래스에 학생 혹은 과제가 존재합니다. 삭제를 취소합니다.");
            return "teacher/classroom/delete";
        }
        catch (Exception e1){
            model.addAttribute("error_message", e1.getMessage());
            return "teacher/classroom/delete";
        }
        model.addAttribute("result_message", "성공적으로 삭제 되었습니다.");
        return "teacher/classroom/delete";
    }
    @PostMapping("/classroom/student/add")
    public String doAddStudent(
            @RequestBody VirtualCR_StudentM_mappingDTO virtualCRStudentMMappingDTO,
            Model model,
            HttpServletRequest request
    ){
        Long selectedStudentIdLong = virtualCRStudentMMappingDTO.getSelectedStudent();
        String className = virtualCRStudentMMappingDTO.getClassName();

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


    @GetMapping("/classroom/student/list")
    public String getStudentListPageWithPost(
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
        List<StudentMemberDTO> studentMemberArrayList = new ArrayList<>();

        List<VirtualCR_StudentM_mapping> virtualCRStudentMMapping = mariaVirtualCRStudentMMapping.findByVirtualClassRoom(virtualClassRoom.get());
        for (VirtualCR_StudentM_mapping virtualCR_studentM_mapping : virtualCRStudentMMapping) {
            StudentMemberDTO tempStudentMemberDTO = new StudentMemberDTO();
            tempStudentMemberDTO.setId(virtualCR_studentM_mapping.getStudentMember().getId());
            tempStudentMemberDTO.setStudentName(virtualCR_studentM_mapping.getStudentMember().getStudentName());
            tempStudentMemberDTO.setEmail(virtualCR_studentM_mapping.getStudentMember().getEmail());
            studentMemberArrayList.add(tempStudentMemberDTO);
        }


//        model.addAttribute("VCRoomId", vCRoomId);
        model.addAttribute("studentMemberArrayList",studentMemberArrayList);
        model.addAttribute("className", className);
        log.info(className);
        return "teacher/classroom/student/list";
    }


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
            model.addAttribute("student_name",studentMember.get().getStudentName());
            model.addAttribute("email",studentMember.get().getEmail());
            model.addAttribute("selected_student",studentMember.get().getId());
        }
        model.addAttribute("class_name", className);
//        log.info(className);

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
        String encodedString = URLEncoder.encode(className, StandardCharsets.UTF_8);
        return "redirect:/teacher/classroom/student/list?className="+encodedString;
    }


    //    assignment
    @GetMapping("/classroom/assignment/add")
    public String getAddAssignentPage(
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
        model.addAttribute("class_name", className);
        return "/teacher/classroom/assignment/add";
    }

    @PostMapping("/classroom/assignment/add")
    public String doAddAssignent(
            @RequestParam(name = "className") String className,
            @RequestParam(name = "assignmentCreationDate") Date assignmentCreationDate,
            @RequestParam(name = "assignmentDueDate") Date assignmentDueDate,
            @RequestParam(name = "sectionName") String sectionName,
            Model model,
            HttpServletRequest request
    ) throws UnsupportedEncodingException {
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
        if (virtualClassRoom.isPresent()){
            //virtualClassRoom에 기존에 있던 과제에서 현재 sectionName과 중복되는게 있는지 검사한다.
            if (sectionName != null && mariaStudentAssignment.existsBySectionName(sectionName)) {
                // 중복된 sectionName이 존재하는 경우
                model.addAttribute("error", "중복되는 sectionName이 이미 존재합니다.");
                return "/teacher/classroom/assignment/add";
            }
            //검사후 중복되는 게 없다면 새로운 과제로 추가한다.
            StudentAssignment studentAssignment = new StudentAssignment();
            studentAssignment.setVirtualClassRoom(virtualClassRoom.get());
            studentAssignment.setAssignmentCreationDate(assignmentCreationDate);
            studentAssignment.setAssignmentDueDate(assignmentDueDate);
            studentAssignment.setSectionName(sectionName);
            mariaStudentAssignment.save(studentAssignment);
        }
//        model.addAttribute("error_message", "추가에 실패했습니다. 웹을 새로 시작해주세요.");
//        return "redirect:/teacher/classroom/assignment/list?className=" + className;
        String encodedString = URLEncoder.encode(className, StandardCharsets.UTF_8);
        return "redirect:/teacher/classroom/assignment/list?className=" + encodedString;
//        출처: https://unikys.tistory.com/195 [All-round programmer:티스토리];
    }


    @GetMapping("/classroom/assignment/list")
    public String getAssignmentListPageWithPost(
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


//         studentAssignmentList = new ArrayList<>();
        List<StudentAssignment> studentAssignmentList = mariaStudentAssignment.findByVirtualClassRoom(virtualClassRoom.get());
//        model.addAttribute("VCRoomId", vCRoomId);
        model.addAttribute("student_assignment_list" ,studentAssignmentList);
        model.addAttribute("class_name", className);
        log.info(className);
        return "teacher/classroom/assignment/list";
    }


    @GetMapping("/classroom/assignment/detail")
    public String getDetailPageAssignment(
            @RequestParam(name = "selectedSectionId") Long selectedSectionId,
//            @RequestParam(name = "sectionName") String sectionName,
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


        Optional<StudentAssignment> studentAssignment = mariaStudentAssignment.findById(selectedSectionId);
        if (studentAssignment.isEmpty()){
            model.addAttribute("error_message", "해당하는 학생 정보가 존재하지 않습니다.");
        }

        if (studentAssignment.isPresent()){
            model.addAttribute("assignment_id",studentAssignment.get().getId());
            model.addAttribute("section_name",studentAssignment.get().getSectionName());
            model.addAttribute("assignment_creation_date",studentAssignment.get().getAssignmentCreationDate());
            model.addAttribute("assignment_due_date",studentAssignment.get().getAssignmentDueDate());
//            model.addAttribute("virtual_class_room",studentAssignment.get().getVirtualClassRoom());
        }
        model.addAttribute("class_name", className);
//        log.info(className);

        return "teacher/classroom/assignment/detail";
    }

    @PostMapping("/classroom/assignment/delete")
    public String removeAssignmentFromMappingTable(
            @RequestParam(name = "studentAssignmentId") Long studentAssignmentId,
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

//        Optional<StudentAssignment> studentAssignment = mariaStudentAssignment.findById(studentAssignmentId);
        //학생들 과제 수행 관련하여 존재한다면 삭제 하지 않는다.
        //위 조건을 통과하면 삭제한다.
        try{
            studentAssignmentService.deleteStudentAssignmentById(studentAssignmentId);
        }
        catch (DataIntegrityViolationException e){
            model.addAttribute("error_message", "해당 과제에 점수를 제출한 기록이 존재합니다. 삭제를 취소합니다.");
            return "teacher/classroom/assignment/delete";
        }
        catch (Exception e1){
            model.addAttribute("error_message", e1.getMessage());
            return "teacher/classroom/assignment/delete";
        }

        model.addAttribute("className", className );
        String encodedString = URLEncoder.encode(className, StandardCharsets.UTF_8);
        return "redirect:/teacher/classroom/assignment/list?className=" + encodedString;
//        return "redirect:/teacher/classroom/assignment/list?className="+className;
    }

    @GetMapping("/classroom/assignment/score/record")
    public String getScoreRecordPageAssignment(
            @RequestParam(name = "studentAssignmentId") Long selectedSectionId,
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


        Optional<StudentAssignment> studentAssignment = mariaStudentAssignment.findById(selectedSectionId);
        if (studentAssignment.isEmpty()){
            model.addAttribute("error_message", "해당하는 학생 정보가 존재하지 않습니다.");
        }

        if (studentAssignment.isPresent()){
            model.addAttribute("selectedSectionId",studentAssignment.get().getId());
            model.addAttribute("section_name",studentAssignment.get().getSectionName());
//            model.addAttribute("assignment_creation_date",studentAssignment.get().getAssignmentCreationDate());
//            model.addAttribute("assignment_due_date",studentAssignment.get().getAssignmentDueDate());
        }
        model.addAttribute("class_name", className);
        List<StudentAssignmentRecord> studentAssignmentRecordList
                = mariaStudentAssignmentRecord.findAll();
        model.addAttribute("studentAssignmentRecordList", studentAssignmentRecordList);

        return "teacher/classroom/assignment/score/record";
    }

}
