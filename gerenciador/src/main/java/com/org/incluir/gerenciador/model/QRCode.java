package com.org.incluir.gerenciador.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "qrCode")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QRCode {

    @Id
    @Indexed(unique = true)
    private String id;

    private String url;

    @DBRef
    private Clazz clazz;

    private String key;

    private Date initialDate;

    private Date finalDate;
}
