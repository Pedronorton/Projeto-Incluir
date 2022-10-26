package com.org.incluir.gerenciador.controller;

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

    @PostMapping(value = "/{keyQRCode}")
    public ResponseEntity<?> criar(@PathVariable String keyQRCode){
        QRCode qrCode = qrCodeService.create(keyQRCode);
        return ResponseEntity.ok().body(qrCode);
    }

    @GetMapping(value = "/{url}")
    public ResponseEntity<?> get(@PathVariable String url) throws NotFoundError {
        Optional<QRCode> qrCode = qrCodeService.findByUrl(url);
        return ResponseEntity.ok().body(qrCode);
    }

    @GetMapping(value = "/")
    public ResponseEntity<?> getAll()  {
        List<QRCode> list = qrCodeService.getAll();
        return ResponseEntity.ok().body(list);
    }
}
