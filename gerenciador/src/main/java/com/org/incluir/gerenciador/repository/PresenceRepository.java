package com.org.incluir.gerenciador.repository;

import com.org.incluir.gerenciador.model.Presence;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PresenceRepository extends MongoRepository<Presence, String> {

    public Optional<Presence> findByKey(String key);
}
