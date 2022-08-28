package com.ecommerce.mapper;

import com.ecommerce.model.CartModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class CartMapper implements RowMapper<CartModel> {

    @Override
    public CartModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        UUID productId = UUID.fromString(rs.getString("product_uuid"));
        int qty = rs.getInt("qty");
        UUID custUuid = UUID.fromString(rs.getString("cart_uuid"));

        return new CartModel(custUuid, productId, qty);

    }
}
