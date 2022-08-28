package com.ecommerce.mapper;

import com.ecommerce.model.response.CartItemsModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class CartItemsMapper implements RowMapper<CartItemsModel> {

    @Override
    public CartItemsModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        UUID cartId = UUID.fromString(rs.getString("cart_uuid"));
        UUID productId = UUID.fromString(rs.getString("product_uuid"));
        String productName = rs.getString("name");
        double unitPrice = rs.getDouble("unit_price");
        String img = rs.getString("img");
        int qty = rs.getInt("qty");

return new CartItemsModel(qty, productId, productName, unitPrice, img);

        }
}
