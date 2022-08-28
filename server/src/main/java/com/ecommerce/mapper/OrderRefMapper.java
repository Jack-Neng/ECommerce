package com.ecommerce.mapper;

import com.ecommerce.model.response.OrderRefModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.UUID;

@Component
public class OrderRefMapper implements RowMapper<OrderRefModel> {

    @Override
    public OrderRefModel mapRow(ResultSet rs, int rowNum) throws SQLException {

        int orderRef = rs.getInt("order_ref_id");
        UUID orderId = UUID.fromString(rs.getString("order_uuid"));
        String email = rs.getString("email");
        double totalPrice = rs.getDouble("total_price");
        LocalDateTime createDate = rs.getTimestamp("create_date").toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

return new OrderRefModel(orderId, orderRef, createDate, email, totalPrice);

        }
}
