package br.com.emanuelvictor.enrollment.domain.entity;

import br.com.emanuelvictor.enrollment.infrastructure.generic.domain.entity.AbstractEntity;
import com.sun.istack.NotNull;
import io.github.emanuelvictor.annotations.document.CPF;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Email;

/**
 *
 */
@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "deleted=false")
@SQLDelete(sql = "UPDATE people SET deleted = true WHERE id=?")
public class People extends AbstractEntity {

    /**
     *
     */
    @NotNull
    @Column(nullable = false)
    private String name;

    /**
     *
     */
    @CPF
    @NotNull
    @Column(nullable = false, unique = true)
    private String document;

    /**
     *
     */
    @Email
    @NotNull
    @Column(nullable = false, unique = true)
    private String email;

    /**
     *
     */
    private boolean deleted = false;

    /**
     * @param id {@link Long}
     */
    public People(final Long id) {
        this.id = id;
    }
}
