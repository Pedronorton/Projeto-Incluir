package com.org.incluir.gerenciador.controller;


import com.org.incluir.gerenciador.model.User;
import com.org.incluir.gerenciador.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/user")
public class UserController {


    @Autowired
    private UserService userService;


    @RequestMapping(value = "/signUp", method = RequestMethod.POST)
    public ResponseEntity<User> create(){
        User user = new User();
        user.setName("Pedro");
        user.setEmail("pedro.paiva.pdo@gmail.com");
        user.setUsername("pedro.paiva.pdo@gmail.com");
        user.setPassword("1234");
        userService.saveUser(user);

        return ResponseEntity.ok(user);
    }

}
