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

    //1단원
    @GetMapping(value = "/MagicUniv/enroll_01")
    String getMagicUniv_enroll_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/MagicUniv/enroll_01";
    }
    @GetMapping(value = "/MagicUniv/supply_01")
    String getMagicUniv_supply_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/MagicUniv/supply_01";
    }
    @GetMapping(value = "/MagicUniv/supply_02")
    String getMagicUniv_supply_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/MagicUniv/supply_02";
    }
    @GetMapping(value = "/MagicUniv/supply_03")
    String getMagicUniv_supply_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/MagicUniv/supply_03";
    }

    @GetMapping(value = "/MagicUniv/supply_04")
    String getMagicUniv_supply_04(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/MagicUniv/supply_04";
    }

    @GetMapping(value = "/MagicUniv/supply_05")
    String getMagicUniv_supply_05(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/MagicUniv/supply_05";
    }



    //2단원
    @GetMapping(value = "/TextMaterials/Presentation_01")
    String getTextMaterialsPresentation_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Presentation_01";
    }
    @GetMapping(value = "/TextMaterials/Presentation_02")
    String getTextMaterialsPresentation_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Presentation_02";
    }
    @GetMapping(value = "/TextMaterials/Presentation_03")
    String getTextMaterialsPresentation_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Presentation_03";
    }
    @GetMapping(value = "/TextMaterials/Presentation_04")
    String getTextMaterialsPresentation_04(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Presentation_04";
    }
    @GetMapping(value = "/TextMaterials/Presentation_05")
    String getTextMaterialsPresentation_05(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Presentation_05";
    }

    @GetMapping(value = "/TextMaterials/Visualization_01")
    String getTextMaterialsVisualization_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Visualization_01";
    }
    @GetMapping(value = "/TextMaterials/Visualization_02")
    String getTextMaterialsVisualization_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Visualization_02";
    }
    @GetMapping(value = "/TextMaterials/Visualization_03")
    String getTextMaterialsVisualization_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Visualization_03";
    }
    @GetMapping(value = "/TextMaterials/Visualization_04")
    String getTextMaterialsVisualization_04(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TextMaterials/Visualization_04";
    }




    //3단원
    @GetMapping(value = "/ImagePresent/2dImagePresent_01")
    String get2dImagePresent_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/2dImagePresent_01";
    }
    @GetMapping(value = "/ImagePresent/2dImagePresent_02")
    String get2dImagePresent_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/2dImagePresent_02";
    }
    @GetMapping(value = "/ImagePresent/2dImagePresent_03")
    String get2dImagePresent_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/2dImagePresent_03";
    }

    @GetMapping(value = "/ImagePresent/2dImagePresent_04")
    String get2dImagePresent_04(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/2dImagePresent_04";
    }
    @GetMapping(value = "/ImagePresent/2dImagePresent_05")
    String get2dImagePresent_05(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/2dImagePresent_05";
    }
    @GetMapping(value = "/ImagePresent/2dImagePresent_06")
    String get2dImagePresent_06(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/2dImagePresent_06";
    }

    @GetMapping(value = "/ImagePresent/ImagePresent_00")
    String getImagePresent_00(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImagePresent_00";
    }
    @GetMapping(value = "/ImagePresent/ImagePresent_01")
    String getImagePresent_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImagePresent_01";
    }
    @GetMapping(value = "/ImagePresent/ImagePresent_02")
    String getImagePresent_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImagePresent_02";
    }
    @GetMapping(value = "/ImagePresent/ImagePresent_03")
    String getImagePresent_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImagePresent_03";
    }

    @GetMapping(value = "/ImagePresent/ImageProcess_01")
    String getImageProcess_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImageProcess_01";
    }
    @GetMapping(value = "/ImagePresent/ImageProcess_02")
    String getImageProcess_02(Model model){//밝고 어둡게 정수 합, 실수배
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImageProcess_02";
    }
    @GetMapping(value = "/ImagePresent/ImageProcess_03")
    String getImageProcess_03(Model model){//두 사진 합성
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImageProcess_03";
    }
    @GetMapping(value = "/ImagePresent/ImageProcess_04")
    String getImageProcess_04(Model model){//사진 확대 축소
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImageProcess_04";
    }
    @GetMapping(value = "/ImagePresent/ImageProcess_05")
    String getImageProcess_05(Model model){//사진 회전
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImageProcess_05";
    }
    @GetMapping(value = "/ImagePresent/ImageProcess_06")
    String getImageProcess_06(Model model){//종료 서사
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ImagePresent/ImageProcess_06";
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
    @GetMapping(value = "/KNN/KNNFunction_02")
    String getKNNFunction_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/KNN/KNNFunction_02";
    }
    @GetMapping(value = "/KNN/KNNFunction_03")
    String getKNNFunction_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/KNN/KNNFunction_03";
    }
    @GetMapping(value = "/KNN/KNNFunction_04")
    String getKNNFunction_04(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/KNN/KNNFunction_04";
    }

    @GetMapping(value = "/LossFunction/LossFunction_01_dev")
    String getLossFunction_01_dev(){
        return "courses/LossFunction/LossFunction_01_dev";
    }

    @GetMapping(value = "/ManaDescent/ManaDescent_01")
    String getManaDescent(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/ManaDescent/ManaDescent_01";
    }
}
