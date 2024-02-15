package AIMentor.LearnHub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/teacher")
public class Teacher {
    @GetMapping(value = "/register")
    String teacherRegister(){
        return "teacher/register";
    }

}
