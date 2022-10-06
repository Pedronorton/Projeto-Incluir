package com.org.incluir.gerenciador.repository;

import com.org.incluir.gerenciador.model.Presence;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PresenceRepository extends MongoRepository<Presence, Long> {
}
