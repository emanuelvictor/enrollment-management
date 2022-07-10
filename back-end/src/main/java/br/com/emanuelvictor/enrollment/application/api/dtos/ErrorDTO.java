package br.com.emanuelvictor.enrollment.application.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class ErrorDTO {

    /**
     *
     */
    @Getter
    private final String message;

}