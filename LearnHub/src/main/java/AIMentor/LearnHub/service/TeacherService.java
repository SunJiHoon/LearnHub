package AIMentor.LearnHub.service;

import AIMentor.LearnHub.entity.StudentMember;
import AIMentor.LearnHub.entity.VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.entity.VirtualClassRoom;
import AIMentor.LearnHub.repository.Maria_StudentMember;
import AIMentor.LearnHub.repository.Maria_TeacherMember;
import AIMentor.LearnHub.repository.Maria_VirtualCR_StudentM_mapping;
import AIMentor.LearnHub.repository.Maria_VirtualClassRoom;
import AIMentor.LearnHub.utility.Utility;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class TeacherService {
    Utility utility = new Utility();
    Maria_TeacherMember maria_teacherMember;
    Maria_VirtualClassRoom mariaVirtualClassRoom;
    Maria_StudentMember mariaStudentMember;
    Maria_VirtualCR_StudentM_mapping mariaVirtualCRStudentMMapping;
    public TeacherService(
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

    public void deleteSelectedStudentFromMappingTable(StudentMember studentMember, VirtualClassRoom virtualClassRoom){
        List<VirtualCR_StudentM_mapping> mappingsToDelete = mariaVirtualCRStudentMMapping.deleteByStudentMemberAndVirtualClassRoom(studentMember, virtualClassRoom);
        mariaVirtualCRStudentMMapping.deleteAll(mappingsToDelete);
    }
}
