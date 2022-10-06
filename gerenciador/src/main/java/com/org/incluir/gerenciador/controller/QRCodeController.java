package com.org.incluir.gerenciador.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/qrcode")
public class QRCodeController {

    @GetMapping(value = "/")
    public ResponseEntity<?> criar(){
        return ResponseEntity.ok("alo");
    }
}
