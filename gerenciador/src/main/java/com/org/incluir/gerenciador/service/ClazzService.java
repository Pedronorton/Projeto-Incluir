package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.dto.ClazzRequestDTO;
import com.org.incluir.gerenciador.model.Clazz;
import com.org.incluir.gerenciador.model.ClazzTime;
import com.org.incluir.gerenciador.repository.ClazzRepository;
import com.org.incluir.gerenciador.repository.ClazzTimeRepository;
import com.org.incluir.gerenciador.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ClazzService {

    @Autowired
    private ClazzRepository clazzRepository;
    @Autowired
    private ClazzTimeRepository clazzTimeRepository;

    public Optional<Clazz> getById(String id){
        Optional<Clazz> clazz = Optional.ofNullable(clazzRepository.findById(id).orElseThrow(() -> new RuntimeException("Classe não encontrada")));
        return clazz;
    }

    public List<Clazz> getAllClazz(){
        List<Clazz> list = clazzRepository.findAll();
        return list;
    }

    public Clazz criar(ClazzRequestDTO clazzDTO){
        Clazz clazz = new Clazz();
        ClazzTime clazzTime = new ClazzTime();
//        Date date  = DateUtil.convertDate(clazzDTO.getHour(), "yyyy-MM-dd");
//
//        clazzTime.setDay(date.getDate());
//        clazzTime.setInitialHour("10");
//        clazzTime.setFinalHour("11");

        clazzTime = clazzTimeRepository.insert(clazzTime);

        Date dateInitial = new Date();
        Date dateFinal = new Date();
        if(clazzDTO.getHour().equals("nine")){
            dateInitial.setHours(9);
            dateInitial.setMinutes(0);
            dateInitial.setSeconds(0);
            dateFinal.setHours(10);
            dateFinal.setMinutes(0);
            dateFinal.setSeconds(0);
        }else if(clazzDTO.getHour().equals("ten")){
            dateInitial.setHours(10);
            dateInitial.setMinutes(0);
            dateInitial.setSeconds(0);
            dateFinal.setHours(12);
            dateFinal.setMinutes(30);
            dateFinal.setSeconds(0);

        }
        clazz.setName(clazzDTO.getName());
        clazz.setPlace(clazzDTO.getPlace());
        clazz.setInitialHour(dateInitial);
        clazz.setFinalHour(dateFinal);
        clazz.setDay(6);

        Clazz newClazz= clazzRepository.insert(clazz);
        return newClazz;
    }

    public void delete(String id){
        Optional<Clazz> clazz = getById(id);
        clazzRepository.delete(clazz.get());
    }

}
