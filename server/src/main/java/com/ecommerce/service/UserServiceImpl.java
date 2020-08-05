// package com.ecommerce.service;

// import com.ecommerce.entity.Customer;
// import com.ecommerce.repository.CustomerRepository;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
// import
// org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class UserServiceImpl implements UserService {

// @Autowired
// private CustomerRepository customerRepository;

// @Autowired
// private BCryptPasswordEncoder passwordEncoder;

// public Customer findByEmail(String email) {
// return customerRepository.findByEmail(email);
// }

// public Customer save(Customer registration) {
// Customer customer = new Customer();
// customer.setFirstName(registration.getFirstName());
// customer.setLastName(registration.getLastName());
// customer.setEmail(registration.getEmail());
// customer.setPassword(passwordEncoder.encode(registration.getPassword()));
// customer.setPhone(registration.getPhone());
// customer.setAddress(registration.getAddress());
// customer.setCity(registration.getCity());
// customer.setState(registration.getState());
// customer.setCountry(registration.getCountry());
// customer.setPostalCode(registration.getPostalCode());
// return customerRepository.save(customer);
// }

// @Override
// public UserDetails loadUserByUsername(String email) throws
// UsernameNotFoundException {
// Customer customer = customerRepository.findByEmail(email);
// if (customer == null) {
// throw new UsernameNotFoundException("Invalid username or password.");
// }
// return new User(customer.getEmail(), customer.getPassword(), null);
// }
// }