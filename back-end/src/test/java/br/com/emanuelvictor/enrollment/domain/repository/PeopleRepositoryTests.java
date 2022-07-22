package br.com.emanuelvictor.enrollment.domain.repository;

import br.com.emanuelvictor.enrollment.domain.entity.People;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.jdbc.Sql;

import javax.validation.ConstraintViolationException;

/**
 *
 */
@SpringBootTest
public class PeopleRepositoryTests {

    /**
     *
     */
    @Autowired
    PeopleRepository peopleRepository;

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql"})
    public void savePeopleTest() {

        final People people = new People();
        Assertions.assertThat(people.getId()).isNull();

        people.setDocument("07074762911");
        people.setEmail("emanuel.info@gmail.com");
        people.setName("Emanuel Victor de Oliveira Fonseca");
        peopleRepository.save(people);

        Assertions.assertThat(people.getId()).isNotNull();
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql"})
    public void savePeopleWithUniqueEmailTest() {

        final People people = new People();
        Assertions.assertThat(people.getId()).isNull();

        people.setDocument("07131641073");
        people.setEmail("emanuel.info@gmail.com");
        people.setName("Emanuel Victor de Oliveira Fonseca");

        Assertions.assertThatThrownBy(() -> peopleRepository.save(people)).isInstanceOf(DataIntegrityViolationException.class);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql"})
    public void savePeopleWithUniqueCPFTest() {

        final People people = new People();
        Assertions.assertThat(people.getId()).isNull();

        people.setDocument("07074762911");
        people.setEmail("emanuel.infoo@gmail.com");
        people.setName("Emanuel Victor de Oliveira Fonseca");

        Assertions.assertThatThrownBy(() -> peopleRepository.save(people)).isInstanceOf(DataIntegrityViolationException.class);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql"})
    public void savePeopleWithInvalidCPFTest() {

        final People people = new People();
        Assertions.assertThat(people.getId()).isNull();

        people.setDocument("17074762911");
        people.setEmail("emanuel.infoo@gmail.com");
        people.setName("Emanuel Victor de Oliveira Fonseca");

        Assertions.assertThatThrownBy(() -> peopleRepository.save(people)).isInstanceOf(ConstraintViolationException.class);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql"})
    public void savePeopleWithInvalidEmailTest() {

        final People people = new People();
        Assertions.assertThat(people.getId()).isNull();

        people.setDocument("07074762911");
        people.setEmail("emanuel.infogmail.com");
        people.setName("Emanuel Victor de Oliveira Fonseca");

        Assertions.assertThatThrownBy(() -> peopleRepository.save(people)).isInstanceOf(ConstraintViolationException.class);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql"})
    public void safeDeleteStudentTest() {

        // Prepare
        final int oldSize = peopleRepository.findAll().size();

        // Run
        peopleRepository.deleteById(1L);

        // Asserts
        Assertions.assertThat(peopleRepository.findById(1L)).isNotNull();
        Assertions.assertThat(peopleRepository.findAll(Pageable.unpaged()).getSize()).isEqualTo(oldSize - 1);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql"})
    public void updateStudentTest() {

        // Prepare
        final People people = peopleRepository.findById(1L).orElseThrow(RuntimeException::new);
        final String oldName = people.getName();
        final String oldDocument = people.getDocument();
        final String oldEmail = people.getEmail();

        // Run
        people.setDocument("69298669038");
        people.setEmail("emanuelvictor@hotmail.com");
        people.setName("Emanuel Victor");

        peopleRepository.save(people);

        // Assert
        Assertions.assertThat(oldName).isNotEqualTo(people.getName());
        Assertions.assertThat(oldDocument).isNotEqualTo(people.getDocument());
        Assertions.assertThat(oldEmail).isNotEqualTo(people.getEmail());
    }
}