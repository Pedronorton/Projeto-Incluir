package com.org.incluir.gerenciador.dto;

import java.util.Date;

public class ErrorMessage {

    private int status;
    private Date date;
    private String message;
    private String request;


    public ErrorMessage(int status, Date date, String message, String requestDescription) {
        this.status = status;
        this.date = date;
        this.message = message;
        this.request = requestDescription;
    }
}
