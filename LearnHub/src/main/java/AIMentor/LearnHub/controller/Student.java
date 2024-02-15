package AIMentor.LearnHub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/student")
public class Student {
    @GetMapping(value = "/register")
    String teacherRegister(){
        return "student/register";
    }
}
