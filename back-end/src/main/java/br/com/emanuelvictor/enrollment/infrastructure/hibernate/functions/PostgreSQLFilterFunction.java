package br.com.emanuelvictor.enrollment.infrastructure.hibernate.functions;

import lombok.Generated;
import org.hibernate.QueryException;
import org.hibernate.dialect.function.SQLFunction;
import org.hibernate.engine.spi.Mapping;
import org.hibernate.engine.spi.SessionFactoryImplementor;
import org.hibernate.type.BooleanType;
import org.hibernate.type.Type;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
public class PostgreSQLFilterFunction implements SQLFunction {

    /**
     * Ex: FILTER(:filter, configuracao.id, configuracao.email, configuracao.nome) = TRUE
     *
     * @param firstArgumentType Type
     * @param arguments         List
     * @param factory           SessionFactoryImplementor
     * @return String
     * @throws QueryException
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    @Override
    public String render(final Type firstArgumentType, final List arguments, final SessionFactoryImplementor factory) throws QueryException {
        final String query = this.renderCast((String) arguments.get(0));
        final List<String> fields = (List<String>) arguments.stream().skip(1)
                .map(field -> this.renderCast((String) field))
                .collect(Collectors.toList());

        return String.format("FILTER(%s, %s)", query, String.join(", ", fields));
    }

    /**
     * @param field String
     * @return String
     */
    private String renderCast(final String field) {
        return String.format("cast(%s as text)", field);
    }

    /**
     * @param firstArgumentType Type
     * @param mapping           Mapping
     * @return Type
     * @throws QueryException
     */
    @Override
    public Type getReturnType(final Type firstArgumentType, final Mapping mapping) throws QueryException {
        return new BooleanType();
    }

    /**
     * @return boolean
     */
    @Override
    @Generated
    public boolean hasArguments() {
        return true;
    }

    /**
     * @return boolean
     */
    @Override
    @Generated
    public boolean hasParenthesesIfNoArguments() {
        return false;
    }
}
