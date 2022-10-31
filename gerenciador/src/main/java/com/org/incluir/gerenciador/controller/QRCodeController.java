package com.org.incluir.gerenciador.controller;

import com.org.incluir.gerenciador.dto.QRCodeDTO;
import com.org.incluir.gerenciador.errors.NotFoundError;
import com.org.incluir.gerenciador.model.QRCode;
import com.org.incluir.gerenciador.service.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/qrcode")
public class QRCodeController {

    @Autowired
    private QRCodeService qrCodeService;

    @PostMapping(value = "/")
    public ResponseEntity<?> criar(@RequestBody QRCodeDTO qrCodeDTO) throws NotFoundError {
        QRCode qrCode = qrCodeService.create(qrCodeDTO);
        if(qrCode != null){
            return ResponseEntity.ok().body(qrCode);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{key}")
    public ResponseEntity<?> get(@PathVariable String key) throws NotFoundError {
        Optional<QRCode> qrCode = qrCodeService.findByKey(key);
        return ResponseEntity.ok().body(qrCode);
    }

    @GetMapping(value = "/")
    public ResponseEntity<?> getAll()  {
        List<QRCode> list = qrCodeService.getAll();
        return ResponseEntity.ok().body(list);
    }
}
