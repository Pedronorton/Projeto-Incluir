package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.dto.PresenceDTO;
import com.org.incluir.gerenciador.model.Presence;
import com.org.incluir.gerenciador.repository.PresenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PresenceService {

    @Autowired
    private PresenceRepository presenceRepository;

    public Presence create(PresenceDTO presenceDTO){
        return new Presence();
    }

}
