package AIMentor.LearnHub.session;

import AIMentor.LearnHub.entity.Session;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.repository.Maria_Session;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;

import java.util.Optional;
import java.util.UUID;

public class SessionManager {
    Maria_Session mariaSession;
    Maria_TeacherMember maria_teacherMember;
    Maria_StudentMember mariaStudentMember;

    public SessionManager(
            Maria_Session mariaSession,
            Maria_TeacherMember maria_teacherMember,
            Maria_StudentMember mariaStudentMember
    ){
        this.mariaSession = mariaSession;
        this.maria_teacherMember = maria_teacherMember;
        this.mariaStudentMember = mariaStudentMember;
    }
    public void createTeacherSession(String value, HttpServletResponse response) {
        String token = UUID.randomUUID().toString(); //(1)
        Session session = new Session();
        //token, value
        session.setUserId(value);
        session.setUuid(token);
        mariaSession.save(session); //(2)
        Cookie cookie = new Cookie(SessionConst.sessionId_teacher, token); //(3)
        response.addCookie(cookie); //(4)
    }

    public TeacherMember getTeacherCookieAndReading(HttpServletRequest request) {
        // HttpServletRequest를 통해 쿠키 배열을 가져옵니다.
        Cookie[] cookies = request.getCookies();

        Optional<TeacherMember> findTeacherMember = null;
        if (cookies != null) {
            // 모든 쿠키를 순회하면서 원하는 쿠키를 찾습니다.
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("teacherId")) {
                    // 쿠키 값을 가져와서 사용합니다.
                    String cookieValue = cookie.getValue();
//                    findTeacherMember = maria_teacherMember.findById(Long.valueOf(cookieValue));

                    Optional<Session> sessionOptional = null;
                    sessionOptional = mariaSession.findByUuid(cookieValue);
                    if(sessionOptional.isPresent()){
                        findTeacherMember = maria_teacherMember.findById(Long.valueOf(sessionOptional.get().getUserId()));
                    }
                    break;
                }
            }
        }
        if(findTeacherMember!=null && findTeacherMember.isPresent()){
            return findTeacherMember.get();
        }
        return null;
    }

}
