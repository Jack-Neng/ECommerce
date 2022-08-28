package com.ecommerce.mapper;

import com.ecommerce.model.response.OrderItemsModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Component
public class OrderItemsMapper implements RowMapper<OrderItemsModel> {

    @Override
    public OrderItemsModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        UUID productId = UUID.fromString(rs.getString("product_uuid"));
        String productName = rs.getString("name");
        double unitPrice = rs.getDouble("unit_price");
        String img = rs.getString("img");
        int qty = rs.getInt("qty");
        String status = rs.getString("status");
        LocalDateTime shippedDate = rs.getTimestamp("shipped_date").toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
        int orderRef = rs.getInt("order_ref");

return new OrderItemsModel(qty, productId, productName, unitPrice, img, shippedDate, status, orderRef);

        }
}
