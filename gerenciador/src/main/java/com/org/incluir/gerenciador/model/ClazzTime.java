package com.org.incluir.gerenciador.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "clazzTime")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClazzTime {
    @Id
    @Indexed(unique = true)
    private Long id;
    private String initialHour;
    private String finalHour;
    private Integer day;

    @DBRef
    private Clazz idClazz;

}
