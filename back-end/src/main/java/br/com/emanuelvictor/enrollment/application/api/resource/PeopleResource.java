package br.com.emanuelvictor.enrollment.application.api.resource;

import br.com.emanuelvictor.enrollment.domain.entity.People;
import br.com.emanuelvictor.enrollment.infrastructure.generic.application.api.resource.AbstractResource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@Component
@RestController
@RequestMapping({"/v1/peoples", "/v1/students"})
public class PeopleResource extends AbstractResource<People, Long> {

}