package br.com.emanuelvictor.enrollment.application.api.resources;


import br.com.emanuelvictor.enrollment.domain.repository.PeopleRepository;
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

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 *
 */
@SpringBootTest
@AutoConfigureMockMvc
public class PeopleResourceTests {

    /**
     *
     */
    @Autowired
    MockMvc mockMvc;

    /**
     *
     */
    @Autowired
    PeopleRepository peopleRepository;

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql"})
    public void putPeopleToEndpointTest() {

        final long id = 1L;
        final String oldName = peopleRepository.findById(1L).orElseThrow(RuntimeException::new).getName();

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/v1/peoples/" + id)
                        .content(
                                "        {" +
                                        "   \"email\": \"emanuel.info@gmail.com\"," +
                                        "   \"document\": \"07074762911\"," +
                                        "   \"name\": \"New name of class\"" +
                                        "}"
                        )
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        Assertions.assertThat(oldName).isNotEqualTo(peopleRepository.findById(1L).orElseThrow(RuntimeException::new).getName());
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql"})
    public void postPeopleToEndpointTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/v1/peoples")
                        .content(
                                "        {" +
                                        "    \"document\": \"78332890004\"," +
                                        "    \"name\": \"Emanuell Victor de Oliveira Fonseca\"," +
                                        "    \"email\": \"emassll.info@gmail.com\"" +
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
    public void postPeopleWithInvalidDocumentToEndpointTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/v1/peoples")
                        .content(
                                "        {" +
                                        "    \"document\": \"78332890001\"," +
                                        "    \"name\": \"Emanuell Victor de Oliveira Fonseca\"," +
                                        "    \"email\": \"emassll.info@gmail.com\"" +
                                        "}"
                        )
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_classes.sql"})
    public void postPeopleWithInvalidEmailToEndpointTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/v1/peoples")
                        .content(
                                "        {" +
                                        "    \"document\": \"78332890004\"," +
                                        "    \"name\": \"Emanuell Victor de Oliveira Fonseca\"," +
                                        "    \"email\": \"emassll.infogmail.com\"" +
                                        "}"
                        )
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
        ;
    }

    /**
     *
     */
    @Test
    @SneakyThrows
    @Sql({"/dataset/truncate.sql", "/dataset/insert_peoples.sql"})
    public void deletePeopleTest() {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/v1/peoples/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }
}