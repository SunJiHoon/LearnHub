package AIMentor.LearnHub.service;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import AIMentor.LearnHub.repository.Maria_VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.repository.Maria_VirtualClassRoom;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class StudentService {
    Maria_TeacherMember maria_teacherMember;
    Maria_VirtualClassRoom mariaVirtualClassRoom;
    Maria_StudentMember mariaStudentMember;
    Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping;
    public StudentService(
            Maria_TeacherMember maria_teacherMember,
            Maria_VirtualClassRoom mariaVirtualClassRoom,
            Maria_StudentMember mariaStudentMember,
            Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping
    ) {
        this.maria_teacherMember = maria_teacherMember;
        this.mariaVirtualClassRoom = mariaVirtualClassRoom;
        this.mariaStudentMember = mariaStudentMember;
        this.mariaVirtualCRStudentMMapping = mariaVirtualCRStudentMMapping;
    }

    public List<VirtualClassRoom> getStudentsClasses(StudentMember studentMember){
        List<VirtualCR_StudentM_mapping> virtualCRStudentMMappingList = mariaVirtualCRStudentMMapping.findByStudentMember(studentMember);
        List<VirtualClassRoom> studentsVirtualClassRoomList = new ArrayList<>();
        for (int i=0;i<virtualCRStudentMMappingList.size();i++){
            studentsVirtualClassRoomList.add(virtualCRStudentMMappingList.get(i).getVirtualClassRoom());
        }
        return studentsVirtualClassRoomList;
    }


}
