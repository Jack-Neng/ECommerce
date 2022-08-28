package com.ecommerce.mapper.Product;

import com.ecommerce.model.product.ElectronicsProductDetails;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class ElectronicsDetailsMapper implements RowMapper<ElectronicsProductDetails> {

    @Override
    public ElectronicsProductDetails mapRow(ResultSet rs, int rowNum) throws SQLException {

        int productId = rs.getInt("product_id");
        String type   = rs.getString("type");
        String brand   = rs.getString("brand");

        return new ElectronicsProductDetails(productId, type, brand);

    }
}
