package AIMentor.LearnHub.service;

import AIMentor.LearnHub.repository.Maria_StudentAssignment;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class StudentAssignmentService {
    Maria_StudentAssignment studentAssignmentRepository;
    public StudentAssignmentService(Maria_StudentAssignment studentAssignmentRepository) {
        this.studentAssignmentRepository = studentAssignmentRepository;
    }

    public void deleteStudentAssignmentById(Long id) {
        studentAssignmentRepository.deleteById(id);
    }


}
