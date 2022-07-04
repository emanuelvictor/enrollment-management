package br.com.emanuelvictor.enrollment.domain.service;

import br.com.emanuelvictor.enrollment.domain.entity.Class;
import br.com.emanuelvictor.enrollment.domain.entity.Enrollment;
import br.com.emanuelvictor.enrollment.domain.entity.People;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.jdbc.Sql;

/**
 *
 */
@SpringBootTest
public class EnrollmentServiceTests {

    /**
     *
     */
    @Autowired
    EnrollmentService enrollmentService;

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql"})
    public void saveEnrollmentTest() {
        final Enrollment enrollment = new Enrollment(new People(1L), new Class(1L));
        Assertions.assertThat(enrollment.getId()).isNull();

        enrollmentService.save(enrollment);

        Assertions.assertThat(enrollment.getId()).isNotNull();
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql", "/dataset/insert_enrollments.sql"})
    public void findAllEnrollmentsTest() {
        Assertions.assertThat(enrollmentService.findAll(Pageable.unpaged()).getSize()).isEqualTo(6);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql", "/dataset/insert_enrollments.sql"})
    public void deleteByIdTest() {
        final int oldSize = enrollmentService.findAll( Pageable.unpaged()).getSize();

        enrollmentService.deleteById(1L);

        Assertions.assertThat(enrollmentService.findAll(Pageable.unpaged()).getSize()).isEqualTo(oldSize - 1);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql", "/dataset/insert_enrollments.sql"})
    public void findAllByStudentIdTest() {
        final int oldSize = enrollmentService.findByFilters("1", Pageable.unpaged()).getSize();

        enrollmentService.deleteById(1L);

        Assertions.assertThat(enrollmentService.findByFilters("1", Pageable.unpaged()).getSize()).isEqualTo(oldSize - 1);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql", "/dataset/insert_enrollments.sql"})
    public void findAllByStudentEmailTest() {
        final int oldSize = enrollmentService.findByFilters("emanuel.info@gmail.com", Pageable.unpaged()).getSize();

        enrollmentService.deleteById(1L);

        Assertions.assertThat(enrollmentService.findByFilters("emanuel.info@gmail.com", Pageable.unpaged()).getSize()).isEqualTo(oldSize - 1);
    }
}