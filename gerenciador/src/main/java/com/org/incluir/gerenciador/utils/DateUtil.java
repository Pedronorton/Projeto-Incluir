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

    public static boolean afterOrEquals( final Date dt1, final Date dt2 ) {
        if ( ( dt1 == null ) || ( dt2 == null ) ) {
            return false;
        }
        return DateUtil.trunc( dt1 ).after( DateUtil.trunc( dt2 ) )
                || DateUtil.trunc( dt1 ).equals( DateUtil.trunc( dt2 ) );
    }

    public static boolean after( final Date dt1, final Date dt2 ) {
        return dt1 != null && dt2 != null && trunc( dt1 ).after( trunc( dt2 ) );
    }

    public static boolean afterComHora( final Date dt1, final Date dt2 ) {
        if ( ( dt1 == null ) || ( dt2 == null ) ) {
            return false;
        }

        return ( dt1.after( dt2 ) );
    }


    public static boolean beforeOrEquals( final Date dt1, final Date dt2 ) {
        if ( ( dt1 == null ) || ( dt2 == null ) ) {
            return false;
        }
        return DateUtil.trunc( dt1 ).before( DateUtil.trunc( dt2 ) )
                || DateUtil.trunc( dt1 ).equals( DateUtil.trunc( dt2 ) );
    }

    public static Date trunc( final Date dt ) {
        if ( dt == null ) {
            return null;
        }
        Calendar c = DateUtil.obterCalendar( dt );
        c.set( Calendar.HOUR_OF_DAY, 0 );
        c.set( Calendar.MINUTE, 0 );
        c.set( Calendar.SECOND, 0 );
        c.set( Calendar.MILLISECOND, 0 );
        return c.getTime();
    }
}
