package com.ecommerce.service.implementation;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.RoleName;
import com.ecommerce.model.CustomerModel;
import com.ecommerce.repository.CustomerRepositoryJdbc;
import com.ecommerce.repository.RoleRepositoryJdbc;
import com.ecommerce.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.UUID;

@Component
public class CustomerImpl {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    private CustomerRepositoryJdbc customerRepository;

    @Autowired
    private RoleRepositoryJdbc roleRepositoryJdbc;

    public CustomerModel getCustomerByEmail(String email) {
        return customerRepository.getCustomerByEmail(email);
    }

    public void assignNewCartId(CustomerModel customer, UUID cartId) {
        customerRepository.assignCartIdToCustomer(customer.getCustomerId().toString(), cartId.toString());
    }

    public void createCustomer(CustomerModel customer) {
        Role customerRole = roleRepositoryJdbc.getRoleByName(RoleName.ROLE_USER);
        customerRepository.createCustomerWithRole(customer);
        customerRepository.assignUserRole(customer.getCustomerId().toString(), customerRole);
        customerRepository.assignCartIdToNewCustomer(customer.getCustomerId().toString(), customer.getCartId().toString());
    }

    public void updateCustomer(CustomerModel customer) {
        customerRepository.updateCustomer(customer);
    }

    public String authenticate(String email, String password) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        return jwt;

    }
}
