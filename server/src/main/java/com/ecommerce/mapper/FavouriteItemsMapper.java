package com.ecommerce.mapper;

import com.ecommerce.model.response.FavouriteItemsModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class FavouriteItemsMapper implements RowMapper<FavouriteItemsModel> {

    @Override
    public FavouriteItemsModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        UUID customerId = UUID.fromString(rs.getString("customer_uuid"));
        UUID productId = UUID.fromString(rs.getString("product_uuid"));
        String name = rs.getString("name");
        String description = rs.getString("description");
        double unitPrice = rs.getDouble("unit_price");
        String img = rs.getString("img");

return new FavouriteItemsModel(productId, customerId, name, description, unitPrice, img);

        }
}
