package com.ecommerce.mapper;

import com.ecommerce.model.ProductModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class ProductMapper implements RowMapper<ProductModel> {

    @Override
    public ProductModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        int productRef   = rs.getInt("product_id");
        UUID productId   = UUID.fromString(rs.getString("product_uuid"));
        String name        = rs.getString("name");
        String description = rs.getString("description");
        Double unitPrice   = rs.getDouble("unit_price");
        String department  = rs.getString("department");
        String img         = rs.getString("img");

        return new ProductModel(productRef, productId, name, description, unitPrice, department, img);

    }
}
