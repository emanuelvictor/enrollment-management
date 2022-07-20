package br.com.emanuelvictor.enrollment.domain.repository;

import br.com.emanuelvictor.enrollment.domain.entity.Enrollment;
import org.springframework.data.domain.Page;
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
     * @param studentFilter {@link String}
     * @param pageable      {@link Pageable}
     * @return {@link Page}
     */
    @Query("FROM Enrollment enrollment WHERE ( " +
            "       (   " + //todo
            "           :studentFilter IS NOT NULL AND " +
            "           (" +
            "               FILTER(:studentFilter, enrollment.student.id, enrollment.student.email, enrollment.student.document, enrollment.student.name) = TRUE" +
            "           )" +
            "       )   OR :studentFilter IS NULL" +
            ")")
    Page<Enrollment> findByFilters(final String studentFilter, final Pageable pageable);
}
