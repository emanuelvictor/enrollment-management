package br.com.emanuelvictor.enrollment.application.api.resource;


import br.com.emanuelvictor.enrollment.domain.repository.ClassRepository;
import lombok.SneakyThrows;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
public class ClassResourceTests {

    /**
     *
     */
    @Autowired
    MockMvc mockMvc;

    /**
     *
     */
    @Autowired
    ClassRepository classRepository;

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql"})
    public void putClassToEndpointTest() {

        final long id = 1L;
        final String oldName = classRepository.findById(1L).orElseThrow(RuntimeException::new).getName();

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/v1/classes/" + id)
                        .content(
                                "        {" +
                                        "    \"name\": \"New name of class\"" +
                                        "}"
                        )
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        Assertions.assertThat(oldName).isNotEqualTo(classRepository.findById(1L).orElseThrow(RuntimeException::new).getName());
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql"})
    public void postClassToEndpointTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/v1/classes")
                        .content(
                                "        {" +
                                        "    \"name\": \"Name Of Class\"" +
                                        "}"
                        )
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql"})
    public void deleteClassTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/v1/classes/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql"})
    public void findClassByIdTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/v1/classes/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("{\"id\":1,\"name\":\"Class 1\",\"deleted\":false,\"professor\":null}"));
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql"})
    public void findAllClassesTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/v1/classes/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name", startsWith("Class")));
    }
}