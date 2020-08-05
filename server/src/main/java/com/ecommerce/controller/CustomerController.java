package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.ecommerce.entity.Customer;
import com.ecommerce.repository.CustomerRepository;

@Controller
@RequestMapping(path = "/customer")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping()
    public @ResponseBody Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping(path = "/{customerId}")
    public @ResponseBody Customer getCustomerById(@PathVariable Long customerId) {
        return customerRepository.findByCustomerId(customerId);
    }

    @GetMapping(path = "/current_user/{email}")
    public @ResponseBody Long getCustomerIdByEmail(@PathVariable String email) {
        return customerRepository.findByEmail(email).getCustomerId();
    }

}
