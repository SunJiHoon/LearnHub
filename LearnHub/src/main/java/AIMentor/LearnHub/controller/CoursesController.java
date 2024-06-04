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


    //3단원
    //텍스트분류
    @GetMapping(value = "/Classification/TextClassification_01")
    String getTextClassification_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/TextClassification_01";
    }

    //자카드 유사도
    @GetMapping(value = "/Classification/TextClassification_02")
    String getTextClassification_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/TextClassification_02";
    }
    //유클라디안 유사도
    @GetMapping(value = "/Classification/TextClassification_03")
    String getTextClassification_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/TextClassification_03";
    }
    //코사인 유사도
    @GetMapping(value = "/Classification/TextClassification_04")
    String getTextClassification_04(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/TextClassification_04";
    }
    @GetMapping(value = "/Classification/TextClassification_05")
    String getTextClassification_05(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/TextClassification_05";
    }

    //3단원
    //이미지분류
    @GetMapping(value = "/Classification/ImageClassification_01")
    String getImageClassification_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/ImageClassification_01";
    }

    //코드거리
    @GetMapping(value = "/Classification/ImageClassification_02")
    String getImageClassification_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/ImageClassification_02";
    }

    //이미지 간 해밍 거리
    @GetMapping(value = "/Classification/ImageClassification_03")
    String getImageClassification_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/ImageClassification_03";
    }

    //신경망 합과 원리
    @GetMapping(value = "/Classification/ImageClassification_04")
    String getImageClassification_04(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/ImageClassification_04";
    }

    //CNN 입력층 은닉층 출력층 정리
    @GetMapping(value = "/Classification/ImageClassification_05")
    String getImageClassification_05(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/ImageClassification_05";
    }

    @GetMapping(value = "/Classification/ImageClassification_06")
    String getImageClassification_06(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Classification/ImageClassification_06";
    }

    //3-2 단원 경향성과 예측
    //확률을 이용한 예측
    @GetMapping(value = "/TendencyAndPrediction/Probability_01")
    String getProbability_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TendencyAndPrediction/Probability_01";
    }
    @GetMapping(value = "/TendencyAndPrediction/Probability_02")
    String getProbability_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TendencyAndPrediction/Probability_02";
    }
    @GetMapping(value = "/TendencyAndPrediction/Probability_03")
    String getProbability_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TendencyAndPrediction/Probability_03";
    }

    //추세선과 예측
    @GetMapping(value = "/TendencyAndPrediction/TrendLine_01")
    String getTrendLine_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TendencyAndPrediction/TrendLine_01";
    }
    @GetMapping(value = "/TendencyAndPrediction/TrendLine_02")
    String getTrendLine_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TendencyAndPrediction/TrendLine_02";
    }
    @GetMapping(value = "/TendencyAndPrediction/TrendLine_03")
    String getTrendLine_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/TendencyAndPrediction/TrendLine_03";
    }



    //4단원
    @GetMapping(value = "/Optimization/ErrorAndLossFunction_01")
    String getErrorAndLossFunction_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Optimization/ErrorAndLossFunction_01";
    }
    @GetMapping(value = "/Optimization/ErrorAndLossFunction_02")
    String getErrorAndLossFunction_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Optimization/ErrorAndLossFunction_02";
    }
    @GetMapping(value = "/Optimization/ErrorAndLossFunction_03")
    String getErrorAndLossFunction_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Optimization/ErrorAndLossFunction_03";
    }

    @GetMapping(value = "/Optimization/GradientDescent_01")
    String getGradientDescent_01(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Optimization/GradientDescent_01";
    }
    @GetMapping(value = "/Optimization/GradientDescent_02")
    String getGradientDescent_02(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Optimization/GradientDescent_02";
    }
    @GetMapping(value = "/Optimization/GradientDescent_03")
    String getGradientDescent_03(Model model){
        model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
        return "courses/Optimization/GradientDescent_03";
    }
    // @GetMapping(value = "/LossFunction/LossFunction_01")
    // String getLossFunction_01(Model model){
    //     model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
    //     return "courses/LossFunction/LossFunction_01";
    // }
    // @GetMapping(value = "/KNN/KNNFunction_01")
    // String getKNNFunction_01(Model model){
    //     model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
    //     return "courses/KNN/KNNFunction_01";
    // }
    // @GetMapping(value = "/KNN/KNNFunction_02")
    // String getKNNFunction_02(Model model){
    //     model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
    //     return "courses/KNN/KNNFunction_02";
    // }
    // @GetMapping(value = "/KNN/KNNFunction_03")
    // String getKNNFunction_03(Model model){
    //     model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
    //     return "courses/KNN/KNNFunction_03";
    // }
    // @GetMapping(value = "/KNN/KNNFunction_04")
    // String getKNNFunction_04(Model model){
    //     model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
    //     return "courses/KNN/KNNFunction_04";
    // }

    // @GetMapping(value = "/LossFunction/LossFunction_01_dev")
    // String getLossFunction_01_dev(){
    //     return "courses/LossFunction/LossFunction_01_dev";
    // }

    // @GetMapping(value = "/ManaDescent/ManaDescent_01")
    // String getManaDescent(Model model){
    //     model.addAttribute("CurrPath", pathControllerApi.getCurrPath());
    //     return "courses/ManaDescent/ManaDescent_01";
    // }
}
