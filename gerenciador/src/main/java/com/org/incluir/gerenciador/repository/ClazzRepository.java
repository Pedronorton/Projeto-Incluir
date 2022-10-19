package com.org.incluir.gerenciador.repository;

import com.org.incluir.gerenciador.model.Clazz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClazzRepository extends MongoRepository<Clazz, String> {
}
