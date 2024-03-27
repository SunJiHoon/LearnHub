package AIMentor.LearnHub.session;

import AIMentor.LearnHub.entity.GeneralUserMember;
import AIMentor.LearnHub.entity.Session;
import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.repository.Maria_GeneralUserMember;
import AIMentor.LearnHub.repository.Maria_Session;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class SessionManager {
    Maria_Session mariaSession;
    Maria_TeacherMember maria_teacherMember;
    Maria_StudentMember mariaStudentMember;
    Maria_GeneralUserMember mariaGeneralUserMember;

//    public SessionManager(
//            Maria_Session mariaSession,
//            Maria_TeacherMember maria_teacherMember,
//            Maria_StudentMember mariaStudentMember
//    ){
//        this.mariaSession = mariaSession;
//        this.maria_teacherMember = maria_teacherMember;
//        this.mariaStudentMember = mariaStudentMember;
//    }
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
        log.info(Arrays.toString(cookies));
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

    public void createStudentSession(String value, HttpServletResponse response) {
        String token = UUID.randomUUID().toString(); //(1)
        Session session = new Session();
        //token, value
        session.setUserId(value);
        session.setUuid(token);
        mariaSession.save(session); //(2)
        Cookie cookie = new Cookie(SessionConst.sessionId_student, token); //(3)
        response.addCookie(cookie); //(4)
    }

    public StudentMember getStudentCookieAndReading(HttpServletRequest request) {
        // HttpServletRequest를 통해 쿠키 배열을 가져옵니다.
        Cookie[] cookies = request.getCookies();
        log.info(Arrays.toString(cookies));
        Optional<StudentMember> findStudentMember = null;
        if (cookies != null) {
            // 모든 쿠키를 순회하면서 원하는 쿠키를 찾습니다.
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("studentId")) {
                    // 쿠키 값을 가져와서 사용합니다.
                    String cookieValue = cookie.getValue();
//                    findTeacherMember = maria_teacherMember.findById(Long.valueOf(cookieValue));

                    Optional<Session> sessionOptional = null;
                    sessionOptional = mariaSession.findByUuid(cookieValue);
                    if(sessionOptional.isPresent()){
                        findStudentMember = mariaStudentMember.findById(Long.valueOf(sessionOptional.get().getUserId()));
                    }
                    break;
                }
            }
        }
        if(findStudentMember!=null && findStudentMember.isPresent()){
            return findStudentMember.get();
        }
        return null;
    }

    public void createGeneralUserSession(String value, HttpServletResponse response) {
        String token = UUID.randomUUID().toString(); //(1)
        Session session = new Session();
        //token, value
        session.setUserId(value);
        session.setUuid(token);
        mariaSession.save(session); //(2)
        Cookie cookie = new Cookie(SessionConst.sessionId_general_user, token); //(3)
        response.addCookie(cookie); //(4)
    }

    public GeneralUserMember getGeneralUserCookieAndReading(HttpServletRequest request) {
        // HttpServletRequest를 통해 쿠키 배열을 가져옵니다.
        Cookie[] cookies = request.getCookies();
        log.info(Arrays.toString(cookies));
        Optional<GeneralUserMember> findGeneralUserMember = null;
        if (cookies != null) {
            // 모든 쿠키를 순회하면서 원하는 쿠키를 찾습니다.
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("generalUserId")) {
                    // 쿠키 값을 가져와서 사용합니다.
                    String cookieValue = cookie.getValue();
//                    findTeacherMember = maria_teacherMember.findById(Long.valueOf(cookieValue));

                    Optional<Session> sessionOptional = null;
                    sessionOptional = mariaSession.findByUuid(cookieValue);
                    if(sessionOptional.isPresent()){
                        findGeneralUserMember = mariaGeneralUserMember.findById(Long.valueOf(sessionOptional.get().getUserId()));
                    }
                    break;
                }
            }
        }
        if(findGeneralUserMember!=null && findGeneralUserMember.isPresent()){
            return findGeneralUserMember.get();
        }
        return null;
    }


}
