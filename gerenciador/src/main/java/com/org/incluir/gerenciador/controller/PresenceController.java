package com.org.incluir.gerenciador.controller;


import com.org.incluir.gerenciador.dto.PresenceDTO;
import com.org.incluir.gerenciador.model.Presence;
import com.org.incluir.gerenciador.service.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/presence")
public class PresenceController {

    @Autowired
    private PresenceService presenceService;

    @RequestMapping(value = "/{idClazz}", method = RequestMethod.POST)
    public ResponseEntity<Presence> createPresence(@RequestBody PresenceDTO presenceDTO, @PathVariable String idClazz){

        return ResponseEntity.noContent().build();
    }

}
