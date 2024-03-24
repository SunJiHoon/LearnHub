package AIMentor.LearnHub.controller;


import AIMentor.LearnHub.entity.TeacherMember;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/test")
@Slf4j
@AllArgsConstructor
public class TestController {
    @GetMapping(value = "/three/three1")
    String returnThreePage(){
        return "test/three/three1";
    }

}
