package com.ecommerce.mapper;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.RoleName;
import com.ecommerce.model.response.CartItemsModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class RoleMapper implements RowMapper<Role> {

    @Override
    public Role mapRow(ResultSet rs, int rowNum) throws SQLException {

        Long roleId = rs.getLong("role_id");
        RoleName roleName = RoleName.valueOf(rs.getString("role_name"));

        return new Role(roleId, roleName);
    }
}
