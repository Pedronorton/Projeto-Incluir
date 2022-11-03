package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.dto.UserDTO;
import com.org.incluir.gerenciador.model.ERole;
import com.org.incluir.gerenciador.model.Role;
import com.org.incluir.gerenciador.model.User;
import com.org.incluir.gerenciador.repository.RoleRepository;
import com.org.incluir.gerenciador.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository usrRepo;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SequenceGeneratorService seqService;

    public User saveUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getUsername());
        user.setUsername(userDTO.getUsername());
        user.setFunction(userDTO.getFunction());

        User usr = usrRepo.findByEmail(user.getEmail());
        if (usr == null) {
            usr = new User();
            usr.setName(user.getName());
            usr.setUsername(user.getEmail());
            usr.setEmail(user.getEmail());
            usr.setFunction(user.getFunction());
            usr.setActive(true);
            Set<Role> roles = new HashSet<>();

            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            usr.setRoles(roles);

            usr.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            usrRepo.save(usr);
            return usr;
        }
        return null;
    }

    public List<User> getAll(){
        return usrRepo.findAll();
    }

}
