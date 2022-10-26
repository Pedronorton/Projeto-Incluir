package com.org.incluir.gerenciador.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtil {


    public static Date convertDate(String dateString, String format){

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
        formatter.setTimeZone(TimeZone.getTimeZone("GMT-3"));
        Date result = null;
        try {
            result = formatter.parse(dateString);

        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    public static Date obtemDataAdicionadaHoras( Date date, int horas ) {
        Calendar cal = obterCalendar( date );
        cal.add( Calendar.HOUR, horas );
        return cal.getTime();
    }


    public static Calendar obterCalendar( final Date data ) {
        if ( data == null ) {
            return null;
        }

        Calendar c = Calendar.getInstance();
        c.setTime(data);

        return c;
    }
}
