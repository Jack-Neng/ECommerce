package com.ecommerce.mapper.Product;

import com.ecommerce.model.product.SportsProductDetails;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class SportsDetailsMapper implements RowMapper<SportsProductDetails> {

    @Override
    public SportsProductDetails mapRow(ResultSet rs, int rowNum) throws SQLException {

        int productId = rs.getInt("product_id");
        String type   = rs.getString("type");
        String size   = rs.getString("size");

        return new SportsProductDetails(productId, type, size);

    }
}
