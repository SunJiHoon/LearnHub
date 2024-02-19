package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.entity.VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import AIMentor.LearnHub.repository.Maria_VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.repository.Maria_VirtualClassRoom;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import AIMentor.LearnHub.utility.Utility;

@Controller
@RequestMapping(value = "/teacher")
public class TeacherController {
    Utility utility = new Utility();
    Maria_TeacherMember maria_teacherMember;
    Maria_VirtualClassRoom mariaVirtualClassRoom;
    Maria_StudentMember mariaStudentMember;
    Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping;
    public TeacherController(
            Maria_TeacherMember maria_teacherMember,
            Maria_VirtualClassRoom mariaVirtualClassRoom,
            Maria_StudentMember mariaStudentMember,
            Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping
    ) {
        this.maria_teacherMember = maria_teacherMember;
        this.mariaVirtualClassRoom = mariaVirtualClassRoom;
        this.mariaStudentMember = mariaStudentMember;
        this.mariaVirtualCRStudentMMapping = mariaVirtualCRStudentMMapping;
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
    String giveMeLoginPage(){
        return "teacher/login";
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
            return "teacher/register";
        }
        else{
            TeacherMember realTeacherMember = loginTeacherMember.get();
            if(realTeacherMember.getLoginPwd().equals(login_pwd)){
                model.addAttribute("register",
                        realTeacherMember.getTeacherName() +"님 안녕하세요. "
                +"로그인 되었습니다.");
                Cookie idCookie = new Cookie("teacherId",
                        String.valueOf(realTeacherMember.getId()));
                response.addCookie(idCookie);
                return "redirect:/teacher/mypage";
            }
            else{
                model.addAttribute("error_message", "비밀번호가 틀렸습니다.");
                return "teacher/register";
            }
        }
    }

    @GetMapping("/mypage")
    public String getMyPage(
            Model model,
            HttpServletRequest request
    ) {
        // HttpServletRequest를 통해 쿠키 배열을 가져옵니다.
        TeacherMember teacherMember = utility.getCookieAndReading(request, maria_teacherMember);
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
        TeacherMember teacherMember = utility.getCookieAndReading(request, maria_teacherMember);
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

    @PostMapping("/classroom/detail")
    public String doAddStudent(
            @RequestParam(name = "selectedStudent") Long selectedStudentId,
            @RequestParam(name = "VCRoomId") Long VCRoomId,
            Model model,
            HttpServletRequest request
    ){
//        Long selectedStudentId = Long.getLong(selectedStudentIdString);
        TeacherMember teacherMember = utility.getCookieAndReading(request, maria_teacherMember);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }
        Optional<StudentMember> studentMember = mariaStudentMember.findById(selectedStudentId);
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findById(VCRoomId);
        if (studentMember.isPresent() && virtualClassRoom.isPresent()){
//            model.addAttribute("VCRoomId", studentMember.get());
            VirtualCR_StudentM_mapping virtualCRStudentMMapping = new VirtualCR_StudentM_mapping();
//            virtualCRStudentMMapping.setVirtualClassRoom();
            virtualCRStudentMMapping.setStudentMember(studentMember.get());
            virtualCRStudentMMapping.setVirtualClassRoom(virtualClassRoom.get());
            mariaVirtualCRStudentMMapping.save(virtualCRStudentMMapping);
        }
        return "redirect:/teacher/classroom/detail?VCRoomId=" + VCRoomId.toString();
    }
    @GetMapping("/classroom/detail")
    public String getDeatailPageWithPost(
            @RequestParam(name = "VCRoomId") Long VCRoomId,
            Model model,
            HttpServletRequest request
    ){
        TeacherMember teacherMember = utility.getCookieAndReading(request, maria_teacherMember);
        if (teacherMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", teacherMember.getTeacherName());
        }
        model.addAttribute("VCRoomId", VCRoomId);
        Optional<VirtualClassRoom> virtualClassRoom = mariaVirtualClassRoom.findById(VCRoomId);
        List<StudentMember> studentMemberArrayList = new ArrayList<>();
        if (virtualClassRoom.isPresent()){
            List<VirtualCR_StudentM_mapping> virtualCRStudentMMapping = mariaVirtualCRStudentMMapping.findByVirtualClassRoom(virtualClassRoom.get());
            for(int i=0;i<virtualCRStudentMMapping.size();i++){
                studentMemberArrayList.add(virtualCRStudentMMapping.get(i).getStudentMember());
            }
        }

        model.addAttribute("VCRoomId", VCRoomId);
        model.addAttribute("studentMemberArrayList",studentMemberArrayList);
        return "teacher/classroom/detail";
    }
}
