package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.MailDTO;
import AIMentor.LearnHub.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


//https://sundries-in-myidea.tistory.com/113 여기 참고하여 만들었습니다.
@RestController
@RequiredArgsConstructor
@Slf4j
public class MailControllerApiTest {
    private final MailService mailService;

    @Value("${test.email}")
    private String testEmail;

    @PostMapping("/mail")
    public void execMail(
            MailDTO mailDTO
    ) {
        mailService.mailSend(mailDTO);
    }
//    public void mailSend(MailDTO mailDto){
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(mailDto.getAddress());
//        message.setSubject(mailDto.getTitle());
//        message.setText(mailDto.getMessage());
//        javaMailSender.send(message);
//    }
    @PostMapping("/mail/test/email")
    public void execTestMail(
            MailDTO mailDTO
    ) {
//        log.info(mailDTO.getAddress());
        mailDTO.setAddress(testEmail);
//        log.info(mailDTO.getAddress());
        mailService.mailSend(mailDTO);
    }
}
