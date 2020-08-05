package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    public Customer findByCustomerId(Long customerId);

    public Customer findByEmail(String email);

}
