package com.org.incluir.gerenciador.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "clazz")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Clazz {

    @Id
    @Indexed(unique = true)
    private String id;
    private String name;
    private String place;
    private Integer day;
    private Date initialHour;
    private Date finalHour;

//    @DBRef
//    private ClazzTime clazzTime;

}
