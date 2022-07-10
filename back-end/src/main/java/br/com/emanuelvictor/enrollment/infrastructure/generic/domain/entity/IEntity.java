package br.com.emanuelvictor.enrollment.infrastructure.generic.domain.entity;

import java.io.Serializable;

/**
 * @param <ID>
 */
public interface IEntity<ID extends Serializable> extends Serializable {

    /**
     * @return ID
     */
    ID getId();

    /**
     * @param id ID
     */
    void setId(ID id);
}
