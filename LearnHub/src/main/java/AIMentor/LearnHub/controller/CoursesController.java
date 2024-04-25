package AIMentor.LearnHub.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping(value = "/courses")
@Slf4j
public class CoursesController {
    PathController_api pathControllerApi;

    //2단원
    @GetMapping(value = "/ImagePresent/ImagePresent_00")
    String getImagePresent_00(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImagePresent_00";
    }
    //2단원
    @GetMapping(value = "/ImagePresent/ImagePresent_01")
    String getImagePresent_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImagePresent_01";
    }

    //4단원
    @GetMapping(value = "/LossFunction/LossFunction_01")
    String getLossFunction_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/LossFunction/LossFunction_01";
    }
    @GetMapping(value = "/KNN/KNNFunction_01")
    String getKNNFunction_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/KNN/KNNFunction_01";
    }

    @GetMapping(value = "/LossFunction/LossFunction_01_dev")
    String getLossFunction_01_dev(){
        return "courses/LossFunction/LossFunction_01_dev";
    }
}
