package com.ecommerce.mapper.Product;

import com.ecommerce.model.product.HomeProductDetails;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class HomeDetailsMapper implements RowMapper<HomeProductDetails> {

    @Override
    public HomeProductDetails mapRow(ResultSet rs, int rowNum) throws SQLException {

        int productId = rs.getInt("product_id");
        String location   = rs.getString("location");
        String type   = rs.getString("type");

        return new HomeProductDetails(productId, location, type);

    }
}
