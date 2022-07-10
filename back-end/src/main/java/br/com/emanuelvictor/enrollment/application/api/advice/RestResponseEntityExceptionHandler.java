package br.com.emanuelvictor.enrollment.application.api.advice;

import br.com.emanuelvictor.enrollment.application.api.dtos.ErrorDTO;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.postgresql.util.PSQLException;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.logging.Logger;

/**
 * Class RestResponseEntityExceptionHandler
 *
 * @author Emanuel Victor
 * @version 0.0.1
 * @since 0.0.1, 11/03/2022
 */
@Generated
@RestControllerAdvice
@RequiredArgsConstructor
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {


    /**
     *
     */
    private static final Logger LOGGER = Logger.getLogger(RestResponseEntityExceptionHandler.class.getName());

    /**
     *
     */
    private final MessageSource messageSource;


    /**
     * Trata exceções de Constraint geradas pelo PostgreSQL
     *
     * @param exception {DataIntegrityViolationException}
     * @param request   {WebRequest}
     * @return ResponseEntity<Object>
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleException(final org.springframework.dao.DataIntegrityViolationException exception, final WebRequest request) {
        String message = this.messageSource.getMessage("repository.dataIntegrityViolation", null, LocaleContextHolder.getLocale());

        if (exception.getCause() instanceof ConstraintViolationException) {
            final ConstraintViolationException cause = (ConstraintViolationException) exception.getCause();
            final PSQLException sqlException = (PSQLException) cause.getSQLException();

            final String detail = sqlException.getServerErrorMessage().getDetail();

            final String constraintName;

            String key;
            //Verifica o código do erro gerado pelo PostgreSQL
            switch (cause.getSQLState()) {
                case "23503": //violação de exclusão quando chave primaria de registro é referenciado por outro
                    key = detail.substring(detail.indexOf('"') + 1, detail.indexOf('.') - 1);

                    constraintName = this.messageSource.getMessage(snakeCaseToHumanReadable(key), null, LocaleContextHolder.getLocale());

                    message = this.messageSource.getMessage("repository.foreignKeyViolation", new String[]{constraintName}, LocaleContextHolder.getLocale());
                    break;
                case "23505":  //violação de unicidade
                    key = detail.substring(detail.indexOf('(') + 1, detail.indexOf(')'));

                    if (key.startsWith("lower(")) {
                        key = key.replace("lower(", "").replace("::text", "");
                    }

                    constraintName = this.messageSource.getMessage(snakeCaseToHumanReadable(key), null, LocaleContextHolder.getLocale());

                    message = this.messageSource.getMessage("repository.uniqueViolation", new String[]{constraintName}, LocaleContextHolder.getLocale());
                    break;
                case "23502": //violação de nulidade
                    constraintName = this.messageSource.getMessage(cause.getConstraintName(), null, LocaleContextHolder.getLocale());
                    message = this.messageSource.getMessage("repository.fieldMustbeSet", new String[]{constraintName}, LocaleContextHolder.getLocale());
                    break;
                default:
                    constraintName = this.messageSource.getMessage(cause.getConstraintName(), null, LocaleContextHolder.getLocale());
                    message = this.messageSource.getMessage("repository.uniqueViolation", new String[]{constraintName}, LocaleContextHolder.getLocale());
                    break;
            }
        }

        return handleExceptionInternal(exception, new ErrorDTO(message), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    /**
     * Converte de camel case para legível/literal
     */
    private String camelCaseToHumanReadable(String phrase) {
        final String[] words = StringUtils.splitByCharacterTypeCamelCase(phrase);

        return (words.length == 1) ? phrase : StringUtils.capitalize(StringUtils.join(words, " "));
    }

    /**
     * Converte de snake case para legível/literal
     */
    private String snakeCaseToHumanReadable(String phrase) {
        final String[] words = StringUtils.splitByWholeSeparator(phrase, "_");

        return (words.length == 1) ? phrase : StringUtils.capitalize(StringUtils.join(words, " "));
    }

    /**
     * @param exception ConstraintViolationException
     * @param request   WebRequest
     * @return ResponseEntity
     */
    @ExceptionHandler(javax.validation.ConstraintViolationException.class)
    public ResponseEntity<Object> handleException(final javax.validation.ConstraintViolationException exception, final WebRequest request) {
        return super.handleExceptionInternal(exception, new ErrorDTO(exception.getMessage()), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

}