package com.ecommerce.repository;

import com.ecommerce.entity.Role;
import com.ecommerce.mapper.CustomerMapper;
import com.ecommerce.model.CustomerModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CustomerRepositoryJdbc {

    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    CustomerMapper customerMapper;

    private static final String GET_CUSTOMER =
            "-- stmt: GET_CUSTOMER\n " +
            "select " +
            "   c.customer_uuid, " +
            "   c.first_name, " +
            "   c.last_name, " +
            "   c.address, " +
            "   c.city," +
            "   c.state," +
            "   c.postal_code," +
            "   c.country," +
            "   c.phone," +
            "   c.email," +
            "   c.password," +
            "   cf.cart_uuid " +
            "from " +
            "   customer c " +
            "left join cart_ref cf on (c.cart_ref = cf.cart_ref_id) " +
            "where " +
            "   1 = 1 ";

    private static final String CREATE_CUSTOMER =
            "-- stmt: CREATE_CUSTOMER\n " +
            "insert into customer " +
            "( " +
            "   customer_uuid, " +
            "   first_name, " +
            "   last_name, " +
            "   address, " +
            "   city," +
            "   state," +
            "   postal_code," +
            "   country," +
            "   phone," +
            "   email," +
            "   password" +
            ") " +
            "values " +
            "( " +
            "   :customerUuid, " +
            "   :firstName, " +
            "   :lastName, " +
            "   :address, " +
            "   :city," +
            "   :state," +
            "   :postalCode," +
            "   :country," +
            "   :phone," +
            "   :email," +
            "   :password" +
            ") ";

    private static final String UPDATE_CUSTOMER =
            "-- stmt: UPDATE_CUSTOMER\n " +
            "update customer " +
            "set " +
            "   first_name = :firstName, " +
            "   last_name = :lastName, " +
            "   address = :address, " +
            "   city = :city, " +
            "   state = :state, " +
            "   postal_code = :postalCode, " +
            "   country = :country, " +
            "   phone = :phone," +
            "   email = :email" +
            "where " +
            "   customer_uuid = :customerUuid ";

    private static final String ASSIGN_USER_ROLE =
            "-- stmt: ASSIGN_USER_ROLE\n " +
            "insert into user_roles " +
            "( " +
            "   customer_id, " +
            "   role_id " +
            ") " +
            "values " +
            "( " +
            "   (select customer_id from customer where customer_uuid = :customerUuid), " +
            "   :roleId " +
            ") ";

    private static final String ASSIGN_CART_ID_TO_EXISTING_CUSTOMER =
            "-- stmt: ASSIGN_CART_ID_TO_EXISTING_CUSTOMER\n " +
            "update customer, cart, cart_ref " +
            "set " +
            "   cart.cart_ref = cart_ref.cart_ref_id, " +
            "   customer.cart_ref = cart_ref.cart_ref_id " +
            "where " +
            "   cart_ref.cart_uuid = :cartUuid " +
            "and cart.cart_ref = customer.cart_ref " +
            "and customer.customer_uuid = :customerUuid ";

    private static final String ASSIGN_CART_ID_TO_NEW_CUSTOMER =
            "-- stmt: ASSIGN_CART_ID_TO_NEW_CUSTOMER\n " +
            "update customer, cart_ref " +
            "set " +
            "   customer.cart_ref = cart_ref.cart_ref_id " +
            "where " +
            "   cart_ref.cart_uuid = :cartUuid " +
            "and customer.customer_uuid = :customerUuid ";

    private static final String _BY_ID =
            "   and customer_uuid = :customerUuid ";

    private static final String _BY_EMAIL =
            "   and email = :email ";

    public CustomerModel getCustomerByUuid(String customerUuid) {
        try {
            CustomerModel customer = this.jdbcTemplate.queryForObject(
                    GET_CUSTOMER+_BY_ID,
                    new MapSqlParameterSource("customerUuid", customerUuid),
                    customerMapper
            );
            return customer;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public CustomerModel getCustomerByEmail(String email) {
        try {
            CustomerModel customer = this.jdbcTemplate.queryForObject(
                    GET_CUSTOMER+_BY_EMAIL,
                    new MapSqlParameterSource("email", email),
                    customerMapper
            );
            return customer;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void assignCartIdToCustomer(String customerId, String cartId) {
        try {
            this.jdbcTemplate.update(
                    ASSIGN_CART_ID_TO_EXISTING_CUSTOMER,
                    new MapSqlParameterSource("customerUuid", customerId)
                            .addValue("cartUuid", cartId)
            );
        } catch (Exception exception) {
            throw exception;
        }
    }


    public void assignCartIdToNewCustomer(String customerId, String cartId) {
        try {
            this.jdbcTemplate.update(
                    ASSIGN_CART_ID_TO_NEW_CUSTOMER,
                    new MapSqlParameterSource("customerUuid", customerId)
                            .addValue("cartUuid", cartId)
            );
        } catch (Exception exception) {
            throw exception;
        }
    }



    public void assignUserRole(String customerId, Role role) {
        try {
            this.jdbcTemplate.update(
                    ASSIGN_USER_ROLE,
                    new MapSqlParameterSource("customerUuid", customerId)
                            .addValue("roleId", role.getRoleId())
            );
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void createCustomerWithRole(CustomerModel customer) {
        try {
            this.jdbcTemplate.update(
                    CREATE_CUSTOMER,
                    new MapSqlParameterSource("customerUuid", customer.getCustomerId().toString())
                            .addValue("firstName", customer.getFirstName())
                            .addValue("lastName", customer.getLastName())
                            .addValue("address", customer.getAddress())
                            .addValue("city", customer.getCity())
                            .addValue("state", customer.getState())
                            .addValue("postalCode", customer.getPostalCode())
                            .addValue("country", customer.getCountry())
                            .addValue("phone", customer.getPhone())
                            .addValue("email", customer.getEmail())
                            .addValue("password", customer.getPassword())
            );
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void updateCustomer(CustomerModel customer) {
        try {
            this.jdbcTemplate.update(
                    UPDATE_CUSTOMER,
                    new MapSqlParameterSource("customerUuid", customer.getCustomerId().toString())
                            .addValue("firstName", customer.getFirstName())
                            .addValue("lastName", customer.getLastName())
                            .addValue("address", customer.getAddress())
                            .addValue("city", customer.getCity())
                            .addValue("state", customer.getState())
                            .addValue("postalCode", customer.getPostalCode())
                            .addValue("country", customer.getCountry())
                            .addValue("phone", customer.getPhone())
                            .addValue("email", customer.getEmail())
            );
        } catch (Exception exception) {
            throw exception;
        }
    }

}
