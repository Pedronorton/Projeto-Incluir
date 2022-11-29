package com.org.incluir.gerenciador.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundError extends Exception{

    @Getter
    @Setter
    public String message;
    public NotFoundError(String message){
        super(message);
    }

}
