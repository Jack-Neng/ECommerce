package com.ecommerce.mapper.Product;

import com.ecommerce.model.product.ClothesProductDetails;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ClothesDetailsMapper implements RowMapper<ClothesProductDetails> {

    @Override
    public ClothesProductDetails mapRow(ResultSet rs, int rowNum) throws SQLException {

        int productId = rs.getInt("product_id");
        String size   = rs.getString("size");
        String colour   = rs.getString("colour");
        String gender   = rs.getString("gender");

        return new ClothesProductDetails(productId, size, colour, gender);

    }
}
