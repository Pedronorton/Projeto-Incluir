package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.dto.PresenceDTO;
import com.org.incluir.gerenciador.exceptions.NotFoundError;
import com.org.incluir.gerenciador.model.Clazz;
import com.org.incluir.gerenciador.model.Presence;
import com.org.incluir.gerenciador.model.QRCode;
import com.org.incluir.gerenciador.model.User;
import com.org.incluir.gerenciador.repository.ClazzRepository;
import com.org.incluir.gerenciador.repository.PresenceRepository;
import com.org.incluir.gerenciador.repository.QRCodeRepository;
import com.org.incluir.gerenciador.repository.UserRepository;
import com.org.incluir.gerenciador.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PresenceService {

    @Autowired
    ClazzRepository clazzRepository;

    @Autowired
    QRCodeRepository qrCodeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PresenceRepository presenceRepository;

    public Presence create(PresenceDTO presenceDTO) throws NotFoundError {
        Optional<QRCode> qrCode = qrCodeRepository.findById(presenceDTO.getIdQRCode());
        Optional<Clazz> clazz = clazzRepository.findById(presenceDTO.getIdAula());
        Optional<User> user = userRepository.findById(presenceDTO.getIdUser());
        if(qrCode.isEmpty()){
            throw new NotFoundError("QRCode");
        }
        if(clazz.isEmpty()){
            throw new NotFoundError("Class");
        }
        if(user.isEmpty()){
            throw new NotFoundError("User");
        }

        if(validations(qrCode.get(), clazz.get(), user.get())){
            String key = qrCode.get().getId()+'-'+clazz.get().getId()+"-"+user.get().getId();
            Optional<Presence> presence = presenceRepository.findByKey(key);
            if(presence.isPresent()){
                Date endDate = new Date();
                Double hours = user.get().getRegisteredHours();
                if (hours == null){
                    hours = 0d;
                }
                presence.get().setEndHour(endDate);
                presence.get().setOutConfirmation(true);
                presence.get().setConfirmation(true);
                Double minutes = DateUtil.obterDiferencaMinutosDouble(endDate, presence.get().getStartedHour());
                user.get().setRegisteredHours(hours + minutes/60);
                userRepository.save(user.get());
                presenceRepository.save(presence.get());
                return presence.get();
            }else{
                Presence newPresence = new Presence();
                newPresence.setKey(key);
                newPresence.setQRCode(qrCode.get());
                newPresence.setClazz(clazz.get());
                newPresence.setUser(user.get());
                newPresence.setStartedHour(new Date());
                newPresence.setInConfirmation(true);
                newPresence.setOutConfirmation(false);
                newPresence.setConfirmation(false);
                presenceRepository.save(newPresence);
                return newPresence;
            }
        }else{
            return null;
        }
    }

    public Boolean validations(QRCode qrCode, Clazz clazz, User user) throws NotFoundError {
        Date dateNow = new Date();
        if(DateUtil.beforeOrEquals(dateNow, qrCode.getFinalDate())){
            return true;
        }else{
            throw new NotFoundError("QRCode");
        }
    }

    public List<Presence> getAll(){
        return presenceRepository.findAll();
    }


}
