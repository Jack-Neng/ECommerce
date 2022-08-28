package com.ecommerce.mapper;

import com.ecommerce.model.ShipmentModel;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

@Component
public class ShipmentMapper implements RowMapper<ShipmentModel> {

    @Override
    public ShipmentModel mapRow(ResultSet rs, int rowNum) throws SQLException {
        int shipmentId = rs.getInt("shipment_id");
        String firstName = rs.getString("first_name");
        String lastName = rs.getString("last_name");
        String address = rs.getString("address");
        String city = rs.getString("city");
        String postalCode = rs.getString("postal_code");
        String state = rs.getString("state");
        String country = rs.getString("country");
        String phone = rs.getString("phone");

return new ShipmentModel(shipmentId, firstName, lastName, address, city, state, postalCode, country, phone);

        }
}
