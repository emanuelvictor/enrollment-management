package br.com.emanuelvictor.enrollment.domain.repository;

import br.com.emanuelvictor.enrollment.domain.entity.Class;
import br.com.emanuelvictor.enrollment.domain.entity.People;
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
public interface PeopleRepository extends JpaRepository<People, Long> {

    /**
     * @param pageable Pageable
     * @return Page
     */
    @Query("FROM People student WHERE student.deleted IS FALSE")
    Page<People> findAll(final Pageable pageable);

}
