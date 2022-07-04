package br.com.emanuelvictor.enrollment.application.i18n;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Properties;

public class ResourceBundleMessageSourceTests {

    /**
     *
     */
    @Test
    public void getBlankPropertiesTest() {
        final ResourceBundleMessageSource resourceBundleMessageSource = new ResourceBundleMessageSource();
        final Properties properties = resourceBundleMessageSource.getProperties(LocaleContextHolder.getLocale());
        Assertions.assertThat(properties).isNotNull();
        Assertions.assertThat(properties.entrySet()).isEmpty();
    }

    /**
     *
     */
    @Test
    public void getNotBlankPropertiesTest() {
        final ResourceBundleMessageSource resourceBundleMessageSource = (ResourceBundleMessageSource) new MessageSourceConfiguration().messageSource();
        final Properties properties = resourceBundleMessageSource.getProperties(LocaleContextHolder.getLocale());
        Assertions.assertThat(properties).isNotNull();
        Assertions.assertThat(properties.entrySet()).isNotEmpty();
    }
}

