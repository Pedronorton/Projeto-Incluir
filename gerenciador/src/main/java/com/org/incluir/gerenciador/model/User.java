package com.org.incluir.gerenciador.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Document(collection = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {


    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";

    @Id
    @Indexed(unique = true)
    private String id;

    private String name;

    private String username;

    private String password;

    private String email;

    private Date entryDate;

    private Date departureDate;

    private String function;

    @DBRef
    private Set<Role> roles = new HashSet<>();

    private Double registeredHours;
    private Boolean active;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
