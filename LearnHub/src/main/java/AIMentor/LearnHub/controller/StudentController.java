package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
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
@RequestMapping(value = "/student")
public class StudentController {

    Maria_StudentMember mariaStudentMember;
    public StudentController(Maria_StudentMember mariaStudentMember) {
        this.mariaStudentMember = mariaStudentMember;
    }

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
        return "/index";
    }

    @GetMapping(value = "/login")
    String giveMeLoginPage(){
        return "student/login";
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
            return "student/register";
        }
        else{
            StudentMember realStudentMember = loginStudentMember.get();
            if(realStudentMember.getLoginPwd().equals(login_pwd)){
                model.addAttribute("register",
                        realStudentMember.getStudentName() +"님 안녕하세요. "
                                +"로그인 되었습니다.");
                Cookie idCookie = new Cookie("studentId",
                        String.valueOf(realStudentMember.getId()));
                response.addCookie(idCookie);
                return "redirect:/student/mypage";
            }
            else{
                model.addAttribute("error_message", "비밀번호가 틀렸습니다.");
                return "student/register";
            }
        }
    }

}