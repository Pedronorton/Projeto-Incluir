package com.org.incluir.gerenciador.repository;

import com.org.incluir.gerenciador.model.Clazz;
import com.org.incluir.gerenciador.model.QRCode;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface QRCodeRepository extends MongoRepository<QRCode, String> {

    Optional<QRCode> findByKey(String key);

}
