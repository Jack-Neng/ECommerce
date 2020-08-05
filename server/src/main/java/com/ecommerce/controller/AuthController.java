package com.ecommerce.controller;

import java.util.Collections;

import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Role;
import com.ecommerce.entity.RoleName;
import com.ecommerce.model.JwtAuthenticationResponse;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.RoleRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.security.JwtTokenProvider;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateCustomer(@RequestBody Customer customer) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(customer.getEmail(), customer.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer newCustomer) {
        Customer customer = new Customer();
        customer.setEmail(newCustomer.getEmail());
        customer.setPassword(passwordEncoder.encode(newCustomer.getPassword()));
        customer.setFirstName(newCustomer.getFirstName());
        customer.setLastName(newCustomer.getLastName());
        customer.setAddress(newCustomer.getAddress());
        customer.setCity(newCustomer.getCity());
        customer.setState(newCustomer.getState());
        customer.setPostalCode(newCustomer.getPostalCode());
        customer.setCountry(newCustomer.getCountry());
        customer.setPhone(newCustomer.getPhone());

        Role customerRole = roleRepository.findByRoleName(RoleName.ROLE_USER).orElseThrow(() -> new RuntimeException());
        customer.setRoles(Collections.singleton(customerRole));
        customerRepository.save(customer);
        return ResponseEntity.ok("Customer registered successfully!");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCustomer(@RequestBody Customer newCustomer) {
        Customer customer = new Customer();
        customer.setEmail(newCustomer.getEmail());
        customer.setPassword(passwordEncoder.encode(newCustomer.getPassword()));
        customer.setAddress(newCustomer.getAddress());
        customer.setCity(newCustomer.getCity());
        customer.setState(newCustomer.getState());
        customer.setPostalCode(newCustomer.getPostalCode());
        customer.setCountry(newCustomer.getCountry());
        customer.setPhone(newCustomer.getPhone());
        customerRepository.save(customer);
        return ResponseEntity.ok("Profile updated successfully!");
    }
}