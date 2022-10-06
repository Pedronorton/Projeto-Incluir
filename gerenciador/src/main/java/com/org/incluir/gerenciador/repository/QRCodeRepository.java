package com.org.incluir.gerenciador.repository;

import com.org.incluir.gerenciador.model.QRCode;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QRCodeRepository extends MongoRepository<QRCode, Long> {
}
