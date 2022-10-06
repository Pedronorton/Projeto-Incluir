package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.model.Clazz;
import com.org.incluir.gerenciador.repository.ClazzRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClazzService {

    @Autowired
    private ClazzRepository clazzRepository;

    public List<Clazz> getAllClazz(){
        List<Clazz> list = clazzRepository.findAll();
        return list;
    }

    public Clazz criar(Clazz clazz){
        Clazz newClazz= clazzRepository.insert(clazz);
        return newClazz;
    }

}
