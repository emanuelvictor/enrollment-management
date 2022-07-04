package br.com.emanuelvictor.enrollment.domain.repository;

import br.com.emanuelvictor.enrollment.domain.entity.People;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface PeopleRepository extends JpaRepository<People, Long> {

}
