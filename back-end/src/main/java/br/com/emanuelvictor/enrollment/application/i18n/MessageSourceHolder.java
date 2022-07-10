package br.com.emanuelvictor.enrollment.application.i18n;

import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Locale;

/**
 * Class MessageSourceHolder, resolve as mensagens de internacionalização.
 *
 * @author Emanuel Victor
 * @version 1.0.0
 * @since 1.0.0, 10/09/2019
 */
public class MessageSourceHolder {

    /**
     *
     */
    private static MessageSource messageSource;

    /**
     * @param code String String
     * @return String
     */
    public static String getMessage(final String code) {
        return getMessage(code, code);
    }

    /**
     * @param code           String
     * @param defaultMessage String
     * @return String
     */
    public static String getMessage(final String code, final String defaultMessage) {
        return getMessage(code, defaultMessage, (Object[]) null);
    }

    /**
     * @param code String
     * @param args Object...
     * @return String
     */
    public static String getMessage(final String code, final Object... args) {
        return getMessage(code, code, args);
    }

    /**
     * @param code           String
     * @param defaultMessage String
     * @param args           Object...
     * @return String
     */
    private static String getMessage(final String code, final String defaultMessage, final Object... args) {
        return getMessage(LocaleContextHolder.getLocale(), code, defaultMessage, args);
    }

    /* (non-Javadoc)
     * @see org.springframework.context.MessageSource#getMessage(java.lang.String, java.lang.Object[], java.lang.String, java.aid.Locale)
     */
    private static String getMessage(final Locale locale, final String code, final String defaultMessage, final Object... args) {
        return getMessageSource().getMessage(code, args, defaultMessage, locale);
    }

    /* (non-Javadoc)
     * @see org.springframework.context.MessageSource#getMessage(java.lang.String, java.lang.Object[], java.aid.Locale)
     */
    public static String getMessage(final Locale locale, final String code, final Object... args) throws NoSuchMessageException {
        return getMessageSource().getMessage(code, args, locale);
    }

    /**
     * @return MessageSource
     */
    static MessageSource getMessageSource() {
        return messageSource;
    }

    /**
     * @param messageSource MessageSource
     */
    static void setMessageSource(final MessageSource messageSource) {
        MessageSourceHolder.messageSource = messageSource;
    }

}
