package AIMentor.LearnHub.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping(value = "/courses")
@Slf4j
public class CoursesController {
    @GetMapping(value = "/LossFunction/LossFunction_01")
    String getLossFunction_01(){
        return "courses/LossFunction/LossFunction_01";
    }
    @GetMapping(value = "/LossFunction/LossFunction_01_dev")
    String getLossFunction_01_dev(){
        return "courses/LossFunction/LossFunction_01_dev";
    }
}
