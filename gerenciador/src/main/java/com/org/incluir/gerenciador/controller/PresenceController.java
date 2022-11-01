package com.org.incluir.gerenciador.controller;


import com.org.incluir.gerenciador.dto.PresenceDTO;
import com.org.incluir.gerenciador.exceptions.NotFoundError;
import com.org.incluir.gerenciador.model.Presence;
import com.org.incluir.gerenciador.service.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/presence")
public class PresenceController {

    @Autowired
    private PresenceService presenceService;

    @RequestMapping(value = "/{idClazz}", method = RequestMethod.POST)
    public ResponseEntity<Presence> createPresence(@RequestBody PresenceDTO presenceDTO, @PathVariable String idClazz){

        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/markPresence", method = RequestMethod.POST)
    public ResponseEntity<Presence> markPresence(@RequestBody PresenceDTO presenceDTO) throws NotFoundError {
        presenceService.create(presenceDTO);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<?> getAll() throws NotFoundError {
        List<Presence> list = presenceService.getAll();
        return ResponseEntity.ok().body(list);
    }


}
