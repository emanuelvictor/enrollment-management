package br.com.emanuelvictor.enrollment.domain.repository;

import br.com.emanuelvictor.enrollment.domain.entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    /**
     * @param defaultFilter {@link String}
     * @param pageable      {@link Pageable}
     * @return {@link Page}
     */
    @Query("FROM Enrollment enrollment WHERE ( " +
            "       (   " +
            "           (" +
            "               FILTER(:defaultFilter, enrollment.student.id, enrollment.student.email, enrollment.student.document, enrollment.student.name) = TRUE" +
            "           )" +
            "       )" +
            "       AND " +
            "       (" +
            "           enrollment.clazz.deleted IS FALSE" +
            "       )" +
            "       AND " +
            "       (" +
            "           enrollment.student.deleted IS FALSE" +
            "       )" +
            ")")
    Page<Enrollment> findByFilters(final String defaultFilter, final Pageable pageable);
}
