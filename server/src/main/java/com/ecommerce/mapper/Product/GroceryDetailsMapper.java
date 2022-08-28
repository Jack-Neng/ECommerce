package com.ecommerce.mapper.Product;

import com.ecommerce.model.product.GroceryProductDetails;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class GroceryDetailsMapper implements RowMapper<GroceryProductDetails> {

    @Override
    public GroceryProductDetails mapRow(ResultSet rs, int rowNum) throws SQLException {

        int productId = rs.getInt("product_id");
        String type   = rs.getString("type");

        return new GroceryProductDetails(productId, type);

    }
}
