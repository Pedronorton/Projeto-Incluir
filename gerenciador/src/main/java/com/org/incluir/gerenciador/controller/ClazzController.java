package com.org.incluir.gerenciador.controller;


import com.org.incluir.gerenciador.dto.ClazzRequestDTO;
import com.org.incluir.gerenciador.model.Clazz;
import com.org.incluir.gerenciador.service.ClazzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/clazz")
public class ClazzController {

    @Autowired
    private ClazzService clazzService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    private ResponseEntity<?> getAllClazz(){
        List<Clazz> list = clazzService.getAllClazz();
        return ResponseEntity.ok(list);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    private ResponseEntity<?> criar(@RequestBody ClazzRequestDTO clazzDTO){
        Clazz newClazz = clazzService.criar(clazzDTO);
        return ResponseEntity.ok(newClazz);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    private ResponseEntity<?> delete(@PathVariable String id){
       clazzService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
