package br.com.emanuelvictor.enrollment.application.api.resource;

import br.com.emanuelvictor.enrollment.domain.entity.Enrollment;
import br.com.emanuelvictor.enrollment.domain.service.EnrollmentService;
import br.com.emanuelvictor.enrollment.infrastructure.generic.application.api.resource.AbstractResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping("/v1/enrollments")
public class EnrollmentResource extends AbstractResource<Enrollment, Long> {

    /**
     * @param pageable {@link Pageable}
     * @return {@link Page}
     */
    @GetMapping
    Page<Enrollment> findByFilters(final String studentFilter, final Pageable pageable) {
        return ((EnrollmentService) service).findByFilters(studentFilter, pageable);
    }

}