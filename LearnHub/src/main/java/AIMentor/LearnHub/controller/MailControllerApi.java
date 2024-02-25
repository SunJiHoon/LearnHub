package AIMentor.LearnHub.controller;

import AIMentor.LearnHub.dto.MailDTO;
import AIMentor.LearnHub.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


//https://sundries-in-myidea.tistory.com/113 여기 참고하여 만들었습니다.
@RestController
@RequiredArgsConstructor
public class MailControllerApi {
    private final MailService mailService;
    @PostMapping("/mail")
    public void execMail(
            MailDTO mailDTO
    ) {
        mailService.mailSend(mailDTO);
    }
}
