package com.ecommerce.mapper;

import com.ecommerce.model.CustomerModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class CustomerMapper implements RowMapper<CustomerModel> {

    @Override
    public CustomerModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        UUID customerId = UUID.fromString(rs.getString("customer_uuid"));
        String firstName  = rs.getString("first_name");
        String lastName   = rs.getString("last_name");
        String address    = rs.getString("address");
        String city       = rs.getString("city");
        String state      = rs.getString("state");
        String postalCode = rs.getString("postal_code");
        String country    = rs.getString("country");
        String phone      = rs.getString("phone");
        String email      = rs.getString("email");
        UUID cartRef       = UUID.fromString(rs.getString("cart_uuid"));

        return new CustomerModel(customerId, firstName, lastName, address, city, state, postalCode, country, phone, email, "", cartRef);

    }
}
