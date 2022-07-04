package br.com.emanuelvictor.enrollment.domain.entity;

import br.com.emanuelvictor.enrollment.infrastructure.generic.domain.entity.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

/**
 *
 */
@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted=false")
@SQLDelete(sql = "UPDATE class SET deleted = true WHERE id=?")
public class Class extends AbstractEntity {

    /**
     *
     */
    @ManyToOne
    private People professor;

    /**
     *
     */
    @Column(nullable = false, unique = true)
    private String name;
//
//    private List<Discipline> ement;

    /**
     *
     */
    private boolean deleted = false;

    /**
     * @param id {@link Long}
     */
    public Class(final Long id) {
        super(id);
    }
}
