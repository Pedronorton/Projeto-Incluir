package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.dto.ClazzRequestDTO;
import com.org.incluir.gerenciador.model.Clazz;
import com.org.incluir.gerenciador.model.ClazzTime;
import com.org.incluir.gerenciador.repository.ClazzRepository;
import com.org.incluir.gerenciador.repository.ClazzTimeRepository;
import com.org.incluir.gerenciador.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ClazzService {

    @Autowired
    private ClazzRepository clazzRepository;
    @Autowired
    private ClazzTimeRepository clazzTimeRepository;

    public List<Clazz> getAllClazz(){
        List<Clazz> list = clazzRepository.findAll();
        return list;
    }

    public Clazz criar(ClazzRequestDTO clazzDTO){
        Clazz clazz = new Clazz();
        ClazzTime clazzTime = new ClazzTime();
        Date date  = DateUtil.convertDate(clazzDTO.getHour(), "yyyy-MM-dd");

        clazzTime.setDay(date.getDate());
        clazzTime.setInitialHour("10");
        clazzTime.setFinalHour("11");

        clazzTime = clazzTimeRepository.insert(clazzTime);

        clazz.setName(clazzDTO.getName());
        clazz.setPlace(clazzDTO.getPlace());
        clazz.setClazzTime(clazzTime);

        Clazz newClazz= clazzRepository.insert(clazz);
        return newClazz;
    }

}
