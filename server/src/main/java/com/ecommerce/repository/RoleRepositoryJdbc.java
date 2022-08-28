package com.ecommerce.repository;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.RoleName;
import com.ecommerce.mapper.RoleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class RoleRepositoryJdbc {

    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    RoleMapper roleMapper;

    private static final String GET_ROLE_BY_NAME =
            "-- stmt: GET_ROLE_BY_NAME\n " +
            "select " +
            "   role_id, " +
            "   role_name " +
            "from " +
            "   role " +
            "where " +
            "   role_name = :roleName";


    public Role getRoleByName(RoleName roleName) {
        try {
            Role role = this.jdbcTemplate.queryForObject(
                    GET_ROLE_BY_NAME,
                    new MapSqlParameterSource("roleName", roleName.toString()),
                    roleMapper
            );
            return role;
        } catch (Exception exception) {
            throw exception;
        }
    }




}
