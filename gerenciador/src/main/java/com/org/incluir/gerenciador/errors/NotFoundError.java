package com.org.incluir.gerenciador.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundError extends Exception{

    public NotFoundError(String obj){
        super(obj + "não encontrado");
    }

}
