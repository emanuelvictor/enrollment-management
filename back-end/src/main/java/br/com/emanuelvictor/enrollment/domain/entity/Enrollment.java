package br.com.emanuelvictor.enrollment.domain.entity;

import br.com.emanuelvictor.enrollment.infrastructure.generic.domain.entity.AbstractEntity;
import com.fasterxml.jackson.annotation.*;
import com.sun.istack.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

/**
 *
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"student_id", "clazz_id"})
})
public class Enrollment extends AbstractEntity {

    /**
     *
     */
    @NotNull
    @JoinColumn(name = "student_id")
    @ManyToOne(optional = false)
    private People student;

    /**
     *
     */
    @NotNull
    @JsonAlias("class")
    @JsonProperty("class")
    @JoinColumn(name = "clazz_id")
    @ManyToOne(optional = false)
    private Class clazz;

    /**
     * @param student {@link People}
     * @param clazz   {@link Class}
     */
    public Enrollment(final People student, final Class clazz) {
        this.student = student;
        this.clazz = clazz;
    }

}
