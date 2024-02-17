package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping(value = "/teacher")
public class TeacherController {
    Maria_TeacherMember maria_teacherMember;
    public TeacherController(Maria_TeacherMember maria_teacherMember) {
        this.maria_teacherMember = maria_teacherMember;
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
                Cookie idCookie = new Cookie("memberId",
                        String.valueOf(realTeacherMember.getId()));
                response.addCookie(idCookie);
                return "index";
            }
            else{
                model.addAttribute("error_message", "비밀번호가 틀렸습니다.");
                return "teacher/register";
            }
        }
    }



}
