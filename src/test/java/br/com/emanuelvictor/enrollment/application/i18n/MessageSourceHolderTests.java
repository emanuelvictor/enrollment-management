package br.com.emanuelvictor.enrollment.application.i18n;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Locale;

/**
 *
 */
public class MessageSourceHolderTests {

    /**
     *
     */
    @Test
    public void instanceTest() {
        MessageSourceHolder messageSourceHolder = new MessageSourceHolder();
        Assertions.assertThat(messageSourceHolder).isNotNull();
    }

    /**
     *
     */
    @Nested
    public class WhenMustFailDone {

        /**
         *
         */
        @Test
        public void getExceptionsTests() {
            final ResourceBundleMessageSource resourceBundleMessageSource = (ResourceBundleMessageSource) new MessageSourceConfiguration().messageSource();
            MessageSourceHolder.setMessageSource(resourceBundleMessageSource);
            Assertions.assertThat(MessageSourceHolder.getMessageSource()).isNotNull();

            Assertions.assertThat(MessageSourceHolder.getMessage("repository.duplicatedKey")).isNotNull();
            Assertions.assertThat(MessageSourceHolder.getMessage("repository.emptyResult")).isNotNull();
            Assertions.assertThat(MessageSourceHolder.getMessage("repository.foreignKeyViolation", new Object[]{"class"}, LocaleContextHolder.getLocale())).isNotNull();
            Assertions.assertThat(MessageSourceHolder.getMessage("repository.uniqueViolation", new Object[]{"class"}, LocaleContextHolder.getLocale())).isNotNull();
            Assertions.assertThat(MessageSourceHolder.getMessage("repository.dataIntegrityViolation")).isNotNull();
            Assertions.assertThat(MessageSourceHolder.getMessage("repository.notFoundById", new Object[]{"class"}, LocaleContextHolder.getLocale())).isNotNull();
            Assertions.assertThat(MessageSourceHolder.getMessage("repository.fieldMustbeSet", new Object[]{"class"}, LocaleContextHolder.getLocale())).isNotNull();

            // Portuguese tests
            final Locale brazil = new Locale("pt", "BR");
            Assertions.assertThat(MessageSourceHolder.getMessage(brazil, "repository.duplicatedKey")).isEqualTo("Não é possível realizar essa operação por conta de uma restrição de duplicidade.");
            Assertions.assertThat(MessageSourceHolder.getMessage(brazil, "repository.emptyResult")).isEqualTo("Nenhum registro encontrado.");
            Assertions.assertThat(MessageSourceHolder.getMessage(brazil, "repository.foreignKeyViolation", "class")).isEqualTo("Não é possível realizar essa operação, este registro está vinculado a um(a) \"class\".");
            Assertions.assertThat(MessageSourceHolder.getMessage(brazil, "repository.uniqueViolation", "class")).isEqualTo("O campo \"class\" informado já existe.");
            Assertions.assertThat(MessageSourceHolder.getMessage(brazil, "repository.dataIntegrityViolation")).isEqualTo("Não foi possível realizar a operação, pois ocorreu um problema de integridade nos dados.");
            Assertions.assertThat(MessageSourceHolder.getMessage(brazil, "repository.notFoundById", "class")).isEqualTo("Não foi possível encontrar o registro pelo identificador \"class\".");
            Assertions.assertThat(MessageSourceHolder.getMessage(brazil, "repository.fieldMustbeSet", "class")).isEqualTo("O campo \"class\" deve ser informado.");

            // English tests
            final Locale english = new Locale("en", "US");
            Assertions.assertThat(MessageSourceHolder.getMessage(english, "repository.duplicatedKey")).isEqualTo("It´s not possible, because we have a duplicity constraint.");
            Assertions.assertThat(MessageSourceHolder.getMessage(english, "repository.emptyResult")).isEqualTo("Cannot be found register.");
            Assertions.assertThat(MessageSourceHolder.getMessage(english, "repository.foreignKeyViolation", "class")).isEqualTo("It´s not possible execute this operation, this register is vinclued to one \"class\".");
            Assertions.assertThat(MessageSourceHolder.getMessage(english, "repository.uniqueViolation", "class")).isEqualTo("The field \"class\" informed already exists.");
            Assertions.assertThat(MessageSourceHolder.getMessage(english, "repository.dataIntegrityViolation")).isEqualTo("Cannot excute this operation, we have a problem in data integration.");
            Assertions.assertThat(MessageSourceHolder.getMessage(english, "repository.notFoundById", "class")).isEqualTo("Cannot find this register by indentifier \"class\".");
            Assertions.assertThat(MessageSourceHolder.getMessage(english, "repository.fieldMustbeSet", "class")).isEqualTo("The field \"class\" must be informed.");

        }
    }


}
