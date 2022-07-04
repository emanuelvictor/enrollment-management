package br.com.emanuelvictor.enrollment.domain.repository;

import br.com.emanuelvictor.enrollment.domain.entity.Class;
import br.com.emanuelvictor.enrollment.domain.entity.People;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.jdbc.Sql;

/**
 *
 */
@SpringBootTest
public class ClassRepositoryTests {

    /**
     *
     */
    @Autowired
    ClassRepository classRepository;

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql"})
    public void saveClassTest() {

        final Class clazz = new Class();
        Assertions.assertThat(clazz.getId()).isNull();

        clazz.setProfessor(new People(1L));
        clazz.setName("Discipline Name");

        classRepository.save(clazz);

        Assertions.assertThat(clazz.getId()).isNotNull();
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql"})
    public void saveClassWithoutProfessorAndWithoutNameTest() {

        final Class clazz = new Class();
        Assertions.assertThat(clazz.getId()).isNull();

        Assertions.assertThatThrownBy(() -> classRepository.save(clazz)).isInstanceOf(DataIntegrityViolationException.class);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql", "/dataset/insert_classes.sql"})
    public void saveRepteadClassTest() {

        final Class clazz = new Class();
        Assertions.assertThat(clazz.getId()).isNull();

        clazz.setProfessor(new People(1L));
        clazz.setName("Class 1");

        Assertions.assertThatThrownBy(() -> classRepository.save(clazz)).isInstanceOf(DataIntegrityViolationException.class);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql"})
    public void safeDeleteClassTest() {

        // Prepare
        final int oldSize = classRepository.findAll().size();

        // Run
        classRepository.deleteById(1L);

        // Asserts
        Assertions.assertThat(classRepository.findById(1L)).isNotNull();
        Assertions.assertThat(classRepository.findAll().size()).isEqualTo(oldSize - 1);
    }

    /**
     *
     */
    @Test
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql"})
    public void updateClassTest() {

        // Prepare
        final Class clazz = classRepository.findById(1L).orElseThrow(RuntimeException::new);
        final String oldName = clazz.getName();

        // Run
        clazz.setName("Emanuel Victor");
        classRepository.save(clazz);

        // Assert
        Assertions.assertThat(oldName).isNotEqualTo(clazz.getName());
    }
}