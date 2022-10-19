package com.org.incluir.gerenciador.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Getter
@Setter
@Data
@Document(collection = "refreshToken")
public class RefreshToken {
    @Id
    @Indexed(unique = true)
    private String id;

    @DBRef
    private User user;

    private String token;

    private Instant expiryDate;


}