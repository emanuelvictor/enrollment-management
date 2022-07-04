package br.com.emanuelvictor.enrollment.domain.repository;

import br.com.emanuelvictor.enrollment.domain.entity.Class;
import br.com.emanuelvictor.enrollment.domain.entity.Enrollment;
import br.com.emanuelvictor.enrollment.domain.entity.People;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.jdbc.Sql;

import java.util.List;

/**
 *
 */
@SpringBootTest
public class ErollmentRepositoryTests {

    /**
     *
     */
    @Autowired
    EnrollmentRepository enrollmentRepository;

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql"})
    public void saveEnrollmentTest() {

        final Enrollment enrollment = new Enrollment(new People(1L), new Class(1L));

        Assertions.assertThat(enrollment.getId()).isNull();

        enrollmentRepository.save(enrollment);

        Assertions.assertThat(enrollment.getId()).isNotNull();
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql", "/dataset/insert_enrollments.sql"})
    public void saveEnrollmentMustFailTest() {

        final Enrollment enrollment = new Enrollment(new People(1L), new Class(1L));

        Assertions.assertThat(enrollment.getId()).isNull();

        Assertions.assertThatThrownBy(() -> enrollmentRepository.save(enrollment)).isInstanceOf(DataIntegrityViolationException.class);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql", "/dataset/insert_enrollments.sql"})
    public void updateEnrollmentTest() {

        // Prepare
        final Enrollment enrollment = enrollmentRepository.findById(1L).orElseThrow(RuntimeException::new);
        final String oldStudentName = enrollment.getStudent().getName();
        final String oldStudentDocument = enrollment.getStudent().getDocument();
        final String oldStudentEmail = enrollment.getStudent().getEmail();

        final String oldClassName = enrollment.getClazz().getName();

        // Run
        enrollment.setClazz(new Class(2L));
        enrollment.setStudent(new People(2L));

        // Assert
        Assertions.assertThat(oldStudentName).isNotEqualTo(enrollment.getStudent().getName());
        Assertions.assertThat(oldStudentDocument).isNotEqualTo(enrollment.getStudent().getDocument());
        Assertions.assertThat(oldStudentEmail).isNotEqualTo(enrollment.getStudent().getEmail());

        Assertions.assertThat(oldClassName).isNotEqualTo(enrollment.getClazz().getName());
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql", "/dataset/insert_enrollments.sql"})
    public void listEnrollmentsByStudentIdTest() {

        final List<Enrollment> allEnrollments = enrollmentRepository.findAll();
        final Page<Enrollment> enrollmentsByStudent = enrollmentRepository.findByFilters("1", Pageable.unpaged());
        Assertions.assertThat(allEnrollments.size()).isNotEqualTo(enrollmentsByStudent.getSize());
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql", "/dataset/insert_enrollments.sql"})
    public void listEnrollmentsByStudentEmailTest() {

        final List<Enrollment> allEnrollments = enrollmentRepository.findAll();
        final Page<Enrollment> enrollmentsByStudent = enrollmentRepository.findByFilters("emanuel.info@gmail.com", Pageable.unpaged());
        Assertions.assertThat(allEnrollments.size()).isNotEqualTo(enrollmentsByStudent.getSize());
    }
}