package br.com.emanuelvictor.enrollment.domain.repository;

import br.com.emanuelvictor.enrollment.domain.entity.Class;
import br.com.emanuelvictor.enrollment.domain.entity.Enrollment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface ClassRepository extends JpaRepository<Class, Long> {

    /**
     * @param pageable Pageable
     * @return Page
     */
    @Query("FROM Class clazz WHERE clazz.deleted IS FALSE")
    Page<Class> findAll(final Pageable pageable);
}
