package com.org.incluir.gerenciador.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
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
    private Long id;

    private String url;

    private String _class;

    private String key;

    private Date initialDate;

    private Date finalDate;
}
