package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.MailDTO;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.entity.TeacherValidationCode;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import AIMentor.LearnHub.repository.Maria_TeacherValidationCode;
import AIMentor.LearnHub.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

//import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Controller
@RequiredArgsConstructor
public class LoginInfoController {
    private final Maria_TeacherMember mariaTeacherMember;
    private final Maria_TeacherValidationCode mariaTeacherValidationCode;
    private final MailService mailService;

    @Value("${test.email}")
    private String testEmail;
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
        TeacherMember teacherMember =null;
        Optional<TeacherMember> teacherMemberOptional = mariaTeacherMember.findByEmail(email);
        if (teacherMemberOptional.isEmpty()){
            model.addAttribute("error_message","가입 이력이 없는 이메일입니다.");
            return "teacher/loginInfo/id/find";
        }
        else{
            teacherMember = teacherMemberOptional.get();
        }
        //해당 email로 인증 코드 생성해서 보내기
        //테스트 기간동안은 해당 email로 보내지 말고 testEmail로 보내도록하자.
        String validationCodeStr = generateVerificationCode();
        MailDTO mailDTO = new MailDTO();
        mailDTO.setAddress(testEmail);
        mailDTO.setTitle("[LearnHub] 인증코드 발송");
        mailDTO.setMessage("인증코드 : " + validationCodeStr);

        TeacherValidationCode validationCode = new TeacherValidationCode();
        validationCode.setTeacherMember(teacherMember);
        validationCode.setValidationCode(validationCodeStr);
        validationCode.setEmail(email);
        validationCode.setCreationDate(Timestamp.valueOf(LocalDateTime.now()));

        mariaTeacherValidationCode.save(validationCode);
        mailService.mailSend(mailDTO);
        // verificationSection의 표시 여부를 모델에 추가
        boolean showVerificationSection = true; // true로 설정하거나 다른 조건에 따라 설정
        model.addAttribute("showVerificationSection", showVerificationSection);
        model.addAttribute("desiredEmail", email);

        return "teacher/loginInfo/id/find";
    }

    @PostMapping(value = "/teacher/loginInfo/id/detail")
    String postTeacherLoginInfoIdDetail(
            @RequestParam(name = "validationCode") String validationCode,
            @RequestParam(name = "email") String email,
            Model model
    ){
        //email에 해당하는 선생님 계정 찾기
        TeacherMember teacherMember =null;
        Optional<TeacherMember> teacherMemberOptional = mariaTeacherMember.findByEmail(email);
        if (teacherMemberOptional.isEmpty()){
            model.addAttribute("error_message","해당 이메일에 대해 조회가 되지 않습니다.");
            return "teacher/loginInfo/id/find";
        }
        else{
            teacherMember = teacherMemberOptional.get();
        }


        List<TeacherValidationCode> teacherValidationCodeList = mariaTeacherValidationCode.findByTeacherMemberAndCreationDateBetween(teacherMember,
                Timestamp.valueOf(LocalDateTime.now().minusMinutes(5)),
                Timestamp.valueOf(LocalDateTime.now()));

        // 리스트가 비어있지 않은 경우에만 진행
        if (teacherValidationCodeList.isEmpty()) {
            model.addAttribute("error_message","해당 이메일에 대해 조회가 되지 않습니다.");
            return "teacher/loginInfo/id/find";
        }
        // 리스트를 시간 기준으로 역순으로 정렬 (가장 최신이 맨 앞에 오도록)
        teacherValidationCodeList.sort(Comparator.comparing(TeacherValidationCode::getCreationDate).reversed());
        // 가장 최신 요소 가져오기
        TeacherValidationCode latestValidationCode = teacherValidationCodeList.get(0);
        //인증코드가 불일치하면
        if(!latestValidationCode.getValidationCode().equals(validationCode)){
            model.addAttribute("error_message","인증번호 불일치");
            return "teacher/loginInfo/id/find";
        }

        model.addAttribute("userId",teacherMember.getLoginId());
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

    private String generateVerificationCode() {
        // Random 객체 생성
        Random random = new Random();
        StringBuilder resultStr = new StringBuilder();

        for(int i=0;i<5;i++){
            double randomNumber = random.nextDouble();
            resultStr.append(String.valueOf((int) (10 * randomNumber)));
        }
        return resultStr.toString();
    }
}
