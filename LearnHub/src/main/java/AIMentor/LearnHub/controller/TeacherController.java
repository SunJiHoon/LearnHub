package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
            return "/register";
        }

        maria_teacherMember.save(newteacherMember);
        model.addAttribute("register", "선생님 회원가입 완료.");
        return "index";
    }


}
