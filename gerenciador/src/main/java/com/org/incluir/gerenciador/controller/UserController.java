package com.org.incluir.gerenciador.controller;


import com.org.incluir.gerenciador.dto.UserDTO;
import com.org.incluir.gerenciador.model.User;
import com.org.incluir.gerenciador.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/user")
public class UserController {


    @Autowired
    private UserService userService;


    @RequestMapping(value = "/signUp", method = RequestMethod.POST)
    public ResponseEntity<User> create(@RequestBody UserDTO userDTO){

        User user = userService.saveUser(userDTO);

        return ResponseEntity.ok(user);
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<List<User>> getAll(){
        List<User> list = userService.getAll();

        return ResponseEntity.ok(list);
    }

    @RequestMapping(value = "/{email}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserByEmail(@PathVariable String email){
        User user = userService.findByEmail(email);

        return ResponseEntity.ok(user);
    }

}
