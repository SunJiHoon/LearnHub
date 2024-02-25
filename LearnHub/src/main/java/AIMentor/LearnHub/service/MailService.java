package AIMentor.LearnHub.service;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import AIMentor.LearnHub.dto.MailDTO;


@Service
@AllArgsConstructor
public class MailService {
    private JavaMailSender javaMailSender;
    private static final String FROM_ADDRESS = "이메일에 보낼 주소";
    public void mailSend(MailDTO mailDto){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());
        javaMailSender.send(message);
    }
}
