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
@RequestMapping(value = "/general/user")
@Slf4j
public class GeneralUserController {

    Maria_GeneralUserMember mariaGeneralUserMember;
    SessionManager sessionManager;
//    StudentService studentService;
//    Maria_VirtualClassRoom mariaVirtualClassRoom;
//    Maria_StudentAssignment mariaStudentAssignment;
//    Maria_StudentAssignmentRecord mariaStudentAssignmentRecord;

    //@AllArgsConstructor 생성자 대체함.
//    public StudentController(
//            Maria_StudentMember ,
//            SessionManager sessionManager,
//            Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping,
//            StudentService studentService
//) {
//        this.mariaGeneralUserMember = mariaGeneralUserMember;
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
        GeneralUserMember newGeneralUserMember = new GeneralUserMember();
        newGeneralUserMember.setLoginId(login_id);
        newGeneralUserMember.setLoginPwd(login_pwd);
        newGeneralUserMember.setGeneralUserName(student_name);
        newGeneralUserMember.setEmail(email);
        if (newGeneralUserMember.getLoginId().isEmpty() ||
                newGeneralUserMember.getLoginPwd().isEmpty() ||
                newGeneralUserMember.getGeneralUserName().isEmpty() ||
                newGeneralUserMember.getEmail().isEmpty()
        ){
            model.addAttribute("error_message", "입력값이 비었습니다.");
            return "student/register";
        }
        else if(mariaGeneralUserMember.findByLoginId(login_id).isPresent()){
            model.addAttribute("error_message", "이미 가입 이력이 있는 id입니다.");
            return "student/register";
        }
        else if(mariaGeneralUserMember.findByEmail(email).isPresent()){
            model.addAttribute("error_message", "이미 가입 이력이 있는 email입니다.");
            return "student/register";
        }
        mariaGeneralUserMember.save(newGeneralUserMember);
        model.addAttribute("register", "학생 회원가입 완료.");
        //return "redirect:/";
        return "index";
    }

    @GetMapping(value = "/login")
    String giveMeLoginPage(
            Model model,
            HttpServletRequest request
    ){
        GeneralUserMember generalUserMember = sessionManager.getGeneralUserCookieAndReading(request);
        if (generalUserMember == null){
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
        Optional<GeneralUserMember> loginGeneralUserMember = mariaGeneralUserMember.findByLoginId(login_id);

        if(loginGeneralUserMember.isEmpty()){
            model.addAttribute("error_message", "일치하는 id가 없습니다.");
            return "student/login";
        }
        else{
            GeneralUserMember realGeneralUserMember = loginGeneralUserMember.get();
            if(realGeneralUserMember.getLoginPwd().equals(login_pwd)){
                model.addAttribute("register",
                        realGeneralUserMember.getGeneralUserName() +"님 안녕하세요. "
                                +"로그인 되었습니다.");
                sessionManager.createStudentSession(String.valueOf(realGeneralUserMember.getId()), response);
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
        GeneralUserMember generalUserMember = sessionManager.getGeneralUserCookieAndReading(request);
        if (generalUserMember == null){
            //로그인 정보 없음
            model.addAttribute("error_message", "로그인 되어있지 않습니다.");
            return "index";
        }
        else{
            //로그인 되어있음.
            model.addAttribute("name", generalUserMember.getGeneralUserName());
        }

        return "student/mypage";
    }

}
