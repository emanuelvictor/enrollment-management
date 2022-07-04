package br.com.emanuelvictor.enrollment.application.api.resource;

import br.com.emanuelvictor.enrollment.infrastructure.generic.application.api.resource.AbstractResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.emanuelvictor.enrollment.domain.entity.Class;

/**
 *
 */
@RestController
@RequestMapping("/v1/classes")
public class ClassResource extends AbstractResource<Class, Long> {

}