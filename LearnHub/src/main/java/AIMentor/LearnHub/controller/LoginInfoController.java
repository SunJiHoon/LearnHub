package AIMentor.LearnHub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginInfoController {
    @GetMapping(value = "/teacher/loginInfo/id/find")
    String getTeacherLoginInfoId(){
        return "teacher/loginInfo/id/find";
    }

    @PostMapping(value = "/teacher/loginInfo/id/find")
    String postTeacherLoginInfoId(
            @RequestParam(name = "email") String email,
            Model model
    ){
        //해당 email로 가입된 메일이 존재하는지 확인
        //해당 email로 인증 코드 생성해서 보내기

        // verificationSection의 표시 여부를 모델에 추가
        boolean showVerificationSection = true; // true로 설정하거나 다른 조건에 따라 설정
        model.addAttribute("showVerificationSection", showVerificationSection);

        return "teacher/loginInfo/id/find";
    }

    @PostMapping(value = "/teacher/loginInfo/id/detail")
    String postTeacherLoginInfoIdDetail(
            @RequestParam(name = "validationCode") String validationCode,
            Model model
    ){
        //인증코드가 불일치하면
//        model.addAttribute("error_message","인증번호 불일치");
//        return "teacher/loginInfo/id/find";
        //인증코드가 일치하면
//        model.addAttribute("userId", "user_id");
        model.addAttribute("userId", 3);

        return "teacher/loginInfo/id/detail";
    }


    @GetMapping(value = "/teacher/loginInfo/pwd/find")
    String getTeacherLoginInfoPwd(){
        return "teacher/loginInfo/pwd/find";
    }

    @PostMapping(value = "/teacher/loginInfo/pwd/find")
    String postTeacherLoginInfoPwd(
            @RequestParam(name = "email") String email,
            Model model
    ){
        //해당 email로 가입된 메일이 존재하는지 확인
        //해당 email로 인증 코드 생성해서 보내기

        // verificationSection의 표시 여부를 모델에 추가
        boolean showVerificationSection = true; // true로 설정하거나 다른 조건에 따라 설정
        model.addAttribute("showVerificationSection", showVerificationSection);

        return "teacher/loginInfo/pwd/find";
    }

    @PostMapping(value = "/teacher/loginInfo/pwd/change")
    String postTeacherLoginInfoPwdChange(
            @RequestParam(name = "validationCode") String validationCode,
            Model model
    ){
        //인증코드가 불일치하면
//        model.addAttribute("error_message","인증번호 불일치");
//        return "teacher/loginInfo/id/find";
        //인증코드가 일치하면
        model.addAttribute("userId", "user_id");

        return "teacher/loginInfo/pwd/change";
    }
    @PostMapping(value = "/teacher/loginInfo/pwd/result")
    String postTeacherLoginInfoPwdDetail(
            @RequestParam(name = "newPassword") String newPassword,
            Model model
    ){
        //비밀번호 변경이 성공하면
        //비밀번호 변경이 완료되었습니다 메시지 띄우고 홈페이지 이동 버튼 넣어주기.
        model.addAttribute("userId", "성공");
        return "teacher/loginInfo/pwd/result";
    }




}
