package com.ecommerce.controller;

import com.ecommerce.entity.Customer;
import com.ecommerce.model.CustomerModel;
import com.ecommerce.model.JwtAuthenticationResponse;
import com.ecommerce.model.response.LoginResponse;
import com.ecommerce.repository.CustomerRepository;
import com.ecommerce.repository.RoleRepository;

import com.ecommerce.service.implementation.CustomerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
    CustomerImpl customerImpl;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateCustomer(@RequestBody CustomerModel customer) {
        String jwt = customerImpl.authenticate(customer.getEmail(), customer.getPassword());

        CustomerModel currentCustomer = customerImpl.getCustomerByEmail(customer.getEmail());
        customerImpl.assignNewCartId(currentCustomer, customer.getCartId());

        LoginResponse response = new LoginResponse(
                currentCustomer.getCustomerId().toString(),
                customer.getCartId().toString(),
                new JwtAuthenticationResponse(jwt).getAccessToken());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerModel newCustomer) {
        CustomerModel customer = new CustomerModel();
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
        customer.setCartId(newCustomer.getCartId());

        customerImpl.createCustomer(customer);
        String jwt = customerImpl.authenticate(newCustomer.getEmail(), newCustomer.getPassword());
        LoginResponse response = new LoginResponse(
                customer.getCustomerId().toString(),
                customer.getCartId().toString(),
                new JwtAuthenticationResponse(jwt).getAccessToken());

        return ResponseEntity.ok(response);
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