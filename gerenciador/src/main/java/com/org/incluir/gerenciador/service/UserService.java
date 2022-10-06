package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.model.ERole;
import com.org.incluir.gerenciador.model.Role;
import com.org.incluir.gerenciador.model.User;
import com.org.incluir.gerenciador.repository.RoleRepository;
import com.org.incluir.gerenciador.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository usrRepo;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SequenceGeneratorService seqService;

    public void saveUser(User user) {
        User usr = usrRepo.findByEmail(user.getEmail());
        if (usr == null) {
            usr = new User();
            usr.setName(user.getName());
            usr.setUsername(user.getEmail());
            usr.setEmail(user.getEmail());

            Set<Role> roles = new HashSet<>();

            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
            usr.setRoles(roles);

            usr.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//            usr.setAutho(user.getPassword());

//            if (usrRepo.count() == 0L) {
//                usr.setId(0L);
//            } else {
//                Long lastPos = usrRepo.count();
//                usr.setId(lastPos);
//            }
            usrRepo.save(usr);
        }
    }
}
