package br.com.emanuelvictor.enrollment.domain.entity;

import br.com.emanuelvictor.enrollment.infrastructure.generic.domain.entity.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;

/**
 *
 */
@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE class SET deleted = true WHERE id=?")
public class Class extends AbstractEntity {

    /**
     *
     */
    @Column(nullable = false, unique = true)
    private String name;

    /**
     *
     */
    private boolean deleted = false;

    /**
     *
     */
    @ManyToOne
    private People professor;

    /**
     * @param id {@link Long}
     */
    public Class(final Long id) {
        super(id);
    }
}
