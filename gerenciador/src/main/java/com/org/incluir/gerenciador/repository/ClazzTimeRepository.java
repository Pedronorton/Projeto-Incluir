package com.org.incluir.gerenciador.repository;

import com.org.incluir.gerenciador.model.ClazzTime;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClazzTimeRepository extends MongoRepository<ClazzTime, String> {
}
