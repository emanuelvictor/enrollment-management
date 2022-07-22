package br.com.emanuelvictor.enrollment.application.api.resource;


import br.com.emanuelvictor.enrollment.domain.service.EnrollmentService;
import lombok.SneakyThrows;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.startsWith;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 *
 */
@SpringBootTest
@AutoConfigureMockMvc
public class EnrollmentResourceTests {

    /**
     *
     */
    @Autowired
    MockMvc mockMvc;

    /**
     *
     */
    @Autowired
    EnrollmentService enrollmentService;

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql", "/dataset/insert_peoples.sql"})
    public void postEnrollmentToEndpointTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/v1/enrollments")
                        .content(
                                "        {" +
                                        "    \"class\": {\"id\": 1}," +
                                        "    \"student\": {\"id\":1}" +
                                        " }"
                        )
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql", "/dataset/insert_peoples.sql", "/dataset/insert_enrollments.sql"})
    public void putEnrollmentToEndpointTest() {

        Assertions.assertThat(enrollmentService.findById(1L).orElseThrow(RuntimeException::new).getStudent().getId()).isEqualTo(1L);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/v1/enrollments/1")
                        .content(
                                "        {" +
                                        "    \"class\": {\"id\": 1}," +
                                        "    \"student\": {\"id\":2}" +
                                        " }"
                        )
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        Assertions.assertThat(enrollmentService.findById(1L).orElseThrow(RuntimeException::new).getStudent().getId()).isEqualTo(2L);
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql", "/dataset/insert_peoples.sql", "/dataset/insert_enrollments.sql"})
    public void deleteEnrollmentTest() {

        final int oldSize = enrollmentService.findAll(Pageable.unpaged()).getSize();

        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/v1/enrollments/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));

        Assertions.assertThat(enrollmentService.findAll(Pageable.unpaged()).getSize()).isEqualTo(oldSize - 1);
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql", "/dataset/insert_peoples.sql", "/dataset/insert_enrollments.sql"})
    public void findEnrollmentsByStudentIdTest() {

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/v1/enrollments")
                        .queryParam("studentFilter", "emanuel.info@gmail.com")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].student.name", startsWith("Emanuel")));
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql", "/dataset/insert_peoples.sql", "/dataset/insert_enrollments.sql"})
    public void findEnrollmentsByIdTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/v1/enrollments/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("{\"id\":1,\"student\":{\"id\":1,\"name\":\"Emanuel Victor de Oliveira Fonseca\",\"document\":\"07074762911\",\"email\":\"emanuel.info@gmail.com\",\"deleted\":false},\"class\":{\"id\":1,\"name\":\"Class 1\",\"deleted\":false,\"professor\":null}}"));
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql", "/dataset/insert_peoples.sql", "/dataset/insert_enrollments.sql"})
    public void findAllEnrollmentsTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/v1/enrollments/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].class.name", startsWith("Class")));
    }
}