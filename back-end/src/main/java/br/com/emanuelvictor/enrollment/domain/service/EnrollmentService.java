package br.com.emanuelvictor.enrollment.domain.service;

import br.com.emanuelvictor.enrollment.domain.entity.Enrollment;
import br.com.emanuelvictor.enrollment.domain.entity.People;
import br.com.emanuelvictor.enrollment.domain.repository.EnrollmentRepository;
import br.com.emanuelvictor.enrollment.infrastructure.generic.domain.service.AbstractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

/**
 *
 */
@Service
public class EnrollmentService extends AbstractService<Enrollment, Long> {

    /**
     * @param studentFilter {@link String}
     * @param pageable      {@link Pageable}
     * @return {@link Page}
     */
    public Page<Enrollment> findByFilters(final String studentFilter, final Pageable pageable) {
        return ((EnrollmentRepository) repository).findByFilters(studentFilter, pageable);
    }

}
