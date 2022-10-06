package com.org.incluir.gerenciador.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "presence")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Presence {

    @Id
    @Indexed(unique = true)
    private Long id;
    @DBRef
    private QRCode idQRCode;
    @DBRef
    private Clazz idClazz;
    @DBRef
    private User idUser;

    private Date startedHour;
    private Date endHour;
    private Boolean confirmation;
}
