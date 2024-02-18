package AIMentor.LearnHub.utility;

import AIMentor.LearnHub.entity.TeacherMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

public class Utility {
    public TeacherMember getCookieAndReading(HttpServletRequest request, Maria_TeacherMember maria_teacherMember) {
        // HttpServletRequest를 통해 쿠키 배열을 가져옵니다.
        Cookie[] cookies = request.getCookies();

        Optional<TeacherMember> findTeacherMember = null;
        if (cookies != null) {
            // 모든 쿠키를 순회하면서 원하는 쿠키를 찾습니다.
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("teacherId")) {
                    // 쿠키 값을 가져와서 사용합니다.
                    String cookieValue = cookie.getValue();
                    findTeacherMember = maria_teacherMember.findById(Long.valueOf(cookieValue));
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
