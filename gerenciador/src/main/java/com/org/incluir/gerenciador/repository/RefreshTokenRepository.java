package com.org.incluir.gerenciador.repository;

import com.org.incluir.gerenciador.model.RefreshToken;
import com.org.incluir.gerenciador.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);

    int deleteByUser(User user);
}
