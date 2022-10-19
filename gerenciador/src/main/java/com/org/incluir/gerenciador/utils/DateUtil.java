package com.org.incluir.gerenciador.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {


    public static Date convertDate(String dateString, String format){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date result = null;
        try {
            result = formatter.parse(dateString);

        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}
