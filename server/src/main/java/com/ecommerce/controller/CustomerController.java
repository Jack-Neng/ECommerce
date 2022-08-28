package com.ecommerce.controller;

import com.ecommerce.model.CustomerModel;
import com.ecommerce.repository.CustomerRepositoryJdbc;
import com.ecommerce.service.implementation.CustomerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.repository.CustomerRepository;

import java.util.UUID;

@RestController
@Validated
@RequestMapping(path = "/customer")
public class CustomerController {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerRepositoryJdbc customerRepositoryJdbc;

    @Autowired
    private CustomerImpl customerImpl;

    @GetMapping(path = "/{customerId}")
    public CustomerModel getCustomerById(@PathVariable UUID customerId) {
        return customerRepositoryJdbc.getCustomerByUuid(customerId.toString());
    }

    @PatchMapping()
    public CustomerModel updateCustomer(@RequestBody CustomerModel customer) {
        customerImpl.updateCustomer(customer);
        return customer;
    }

}
