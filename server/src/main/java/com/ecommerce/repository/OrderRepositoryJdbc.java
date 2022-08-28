package com.ecommerce.repository;

import com.ecommerce.mapper.OrderItemsMapper;
import com.ecommerce.mapper.OrderRefMapper;
import com.ecommerce.mapper.ShipmentMapper;
import com.ecommerce.model.ShipmentModel;
import com.ecommerce.model.response.OrderItemsModel;
import com.ecommerce.model.response.OrderRefModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderRepositoryJdbc {

    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    OrderItemsMapper orderItemsMapper;

    @Autowired
    OrderRefMapper orderRefMapper;

    @Autowired
    ShipmentMapper shipmentMapper;

    private static final String ASSIGN_NEW_SHIPMENT =
            "-- stmt: ASSIGN_NEW_SHIPMENT\n " +
                    "insert into shipment " +
                    "( " +
                    "   shipment_uuid, " +
                    "   first_name, " +
                    "   last_name, " +
                    "   address, " +
                    "   city, " +
                    "   postal_code, " +
                    "   state, " +
                    "   country, " +
                    "   phone " +
                    ") " +
                    "values " +
                    "( " +
                    "   :shipmentUuid, " +
                    "   :firstName, " +
                    "   :lastName, " +
                    "   :address, " +
                    "   :city, " +
                    "   :postalCode, " +
                    "   :state, " +
                    "   :country, " +
                    "   :phone " +
                    ") ";

    private static final String GET_SHIPMENT =
            "-- stmt: GET_SHIPMENT\n " +
                    "select " +
                    "   s.shipment_id, " +
                    "   s.first_name, " +
                    "   s.last_name, " +
                    "   s.address, " +
                    "   s.city, " +
                    "   s.postal_code, " +
                    "   s.state, " +
                    "   s.country, " +
                    "   s.phone " +
                    "from " +
                    "       shipment s " +
                    "join   order_ref orf on (s.shipment_id = orf.shipment_id) " +
                    "where " +
                    "   orf.order_ref_id = :orderRef ";

    private static final String ASSIGN_NEW_ORDER =
            "-- stmt: ASSIGN_NEW_ORDER\n " +
                    "insert into order_ref " +
                    "( " +
                    "   order_uuid, " +
                    "   customer_id, " +
                    "   shipment_id, " +
                    "   email, " +
                    "   total_price" +
                    ") " +
                    "values " +
                    "( " +
                    "   :orderUuid, " +
                    "   (select customer_id from customer where customer_uuid = :customerUuid), " +
                    "   (select shipment_id from shipment where shipment_uuid = :shipmentUuid), " +
                    "   :email, " +
                    "   :totalPrice" +
                    ") ";

    private static final String INSERT_ITEM_INTO_ORDER =
            "-- stmt: INSERT_ITEM_INTO_ORDER\n " +
            "insert into order_item " +
            "( " +
            "   order_ref, " +
            "   product_id, " +
            "   qty, " +
            "   shipped_date, " +
            "   status" +
            ") " +
            "select " +
            "   orf.order_ref_id as order_ref, " +
            "   c.product_id as product_id, " +
            "   c.qty as qty, " +
            "   case " +
            "       when p.department = 'Grocery' then NOW() + INTERVAL 1 DAY " +
            "       when p.department = 'Electronics' then NOW() + INTERVAL 2 DAY " +
            "       when p.department = 'Clothes' then NOW() + INTERVAL 1 DAY " +
            "       when p.department = 'Home' then NOW() + INTERVAL 2 DAY " +
            "       when p.department = 'Sports' then NOW() + INTERVAL 1 DAY " +
            "       else NOW() + INTERVAL 2 DAY " +
            "       end as shipped_date, " +
            "   'P' as status " +
            "from " +
            "   cart c " +
            "join cart_ref cf on (c.cart_ref = cf.cart_ref_id) " +
            "join product p on (c.product_id = p.product_id) " +
            "join order_ref orf " +
            "where " +
            "   cf.cart_uuid = :cartUuid " +
            "and orf.order_uuid = :orderUuid ";

    private static final String UPDATE_PRODUCT_IN_ORDER_BY_PRODUCT_ID =
            "-- stmt: CANCEL_PRODUCT_IN_ORDER_BY_PRODUCT_ID\n " +
            "update order, " +
            "       order_ref, " +
            "       product " +
            "set " +
            "   order.status = :status " +
            "where " +
            "    order_ref.order_ref_id = order.order_ref " +
            "and product.product_id     = order.product_id " +
            "and order_ref.order_uuid   = :orderUuid " +
            "and product.product_uuid   = :productUuid ";

    private static final String GET_ORDERS =
            "-- stmt: GET_ORDERS\n " +
                    "select " +
                    "   orf.order_ref_id, " +
                    "   orf.order_uuid, " +
                    "   orf.total_price, " +
                    "   orf.email, " +
                    "   orf.create_date " +
                    "from " +
                    "       order_ref orf " +
                    "join   customer c on (c.customer_id = orf.customer_id) " +
                    "where " +
                    "   1=1 ";

    private static final String GET_ORDER_ITEMS =
            "-- stmt: GET_ORDER_ITEMS\n " +
            "select " +
            "   o.qty, " +
            "   o.status, " +
            "   o.shipped_date, " +
            "   p.product_uuid, " +
            "   p.name, " +
            "   p.unit_price, " +
            "   p.img, " +
            "   o.order_ref " +
            "from " +
            "       order_item     o " +
            "join   order_ref orf on (o.order_ref = orf.order_ref_id) " +
            "join   product  p on (o.product_id = p.product_id) " +
            "join   customer c on (c.customer_id = orf.customer_id) " +
            "where " +
            "   1=1 ";

    private static final String _BY_ORDER_ID =
            "and orf.order_uuid = :orderUuid";

    private static final String _BY_CUSTOMER_ID =
            "and c.customer_uuid = :customerUuid";

    private static final String GET_ORDER_ITEMS_BY_ORDER_UUID =
            GET_ORDER_ITEMS + _BY_ORDER_ID;

    private static final String GET_ORDER_ITEMS_BY_CUSTOMER_ID =
            GET_ORDER_ITEMS + _BY_CUSTOMER_ID;

    private static final String GET_ORDERS_BY_CUSTOMER_ID =
            GET_ORDERS + _BY_CUSTOMER_ID;

    private static final String GET_ORDER_UUID_BY_CUSTOMER =
            "-- stmt: GET_ORDER_UUID_BY_CUSTOMER\n " +
            "select " +
            "   orf.order_uuid " +
            "from " +
            "        order_ref orf " +
            "   join customer c on (c.order_ref = orf.order_ref_id) " +
            "where " +
            "   customer_uuid = :customerUuid ";

    public void cancelProductInOrderByProductId(String orderId, String productId, String status) {
        int rows = this.jdbcTemplate.update(
                UPDATE_PRODUCT_IN_ORDER_BY_PRODUCT_ID,
                new MapSqlParameterSource("productUuid", productId)
                        .addValue("orderUuid", orderId)
                        .addValue("status", status)
        );
        if (rows <= 0) {
            // log
        }
    }

    public List<OrderRefModel> getOrdersByCustomer(String customerUuid) {
        try {
            List<OrderRefModel> orderRef = this.jdbcTemplate.query(
                    GET_ORDERS_BY_CUSTOMER_ID,
                    new MapSqlParameterSource()
                            .addValue("customerUuid", customerUuid),
                    orderRefMapper
            );
            return orderRef;
        } catch (Exception exception) {
            throw exception;
        }
    }
    public List<OrderItemsModel> getOrderItemsByCustomer(String customerUuid) {
        try {
            List<OrderItemsModel> orderItems = this.jdbcTemplate.query(
                    GET_ORDER_ITEMS_BY_CUSTOMER_ID,
                    new MapSqlParameterSource()
                            .addValue("customerUuid", customerUuid),
                    orderItemsMapper
            );
            return orderItems;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public List<OrderItemsModel> getOrderItemsByOrderId(String orderUuid) {
        try {
            List<OrderItemsModel> orderItems = this.jdbcTemplate.query(
                    GET_ORDER_ITEMS_BY_ORDER_UUID,
                    new MapSqlParameterSource()
                            .addValue("orderUuid", orderUuid),
                    orderItemsMapper
            );
            return orderItems;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public ShipmentModel getShipment(int orderRef) {
        try {
            ShipmentModel shipment = this.jdbcTemplate.queryForObject(
                    GET_SHIPMENT,
                    new MapSqlParameterSource()
                            .addValue("orderRef", orderRef),
                    shipmentMapper
            );
            return shipment;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void insertOrderItem(String orderId, String cartUuid) {
        try {
            this.jdbcTemplate.update(
                    INSERT_ITEM_INTO_ORDER,
                    new MapSqlParameterSource("orderUuid", orderId)
                            .addValue("cartUuid", cartUuid)
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }

    public void updateOrderItem(String orderId, String productId, String status) {
        try {
            this.jdbcTemplate.update(
                    UPDATE_PRODUCT_IN_ORDER_BY_PRODUCT_ID,
                    new MapSqlParameterSource("orderUuid", orderId)
                            .addValue("productUuid", productId)
                            .addValue("status", status)
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }

    public String getOrderUuidByCustomer(String customerUuid) {
        try {
            String orderUuid = this.jdbcTemplate.queryForObject(
                    GET_ORDER_UUID_BY_CUSTOMER,
                    new MapSqlParameterSource("customerUuid", customerUuid),
                    String.class
            );
            return orderUuid;
        } catch (Exception exception) {
            throw exception;
        }
    }


    public void assignNewOrder(String orderUuid, String shipmentUuid, String customerUuid, String email, Double totalPrice) {
        try {
            this.jdbcTemplate.update(
                    ASSIGN_NEW_ORDER,
                    new MapSqlParameterSource("orderUuid", orderUuid)
                            .addValue("shipmentUuid", shipmentUuid)
                            .addValue("customerUuid", customerUuid)
                            .addValue("email", email)
                            .addValue("totalPrice", totalPrice)
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }


    public void assignNewShipment(String shipmentId, ShipmentModel shipment) {
        try {
            this.jdbcTemplate.update(
                    ASSIGN_NEW_SHIPMENT,
                    new MapSqlParameterSource("shipmentUuid", shipmentId)
                            .addValue("firstName", shipment.getFirstName())
                            .addValue("lastName", shipment.getLastName())
                            .addValue("address", shipment.getAddress())
                            .addValue("city", shipment.getCity())
                            .addValue("postalCode", shipment.getPostalCode())
                            .addValue("state", shipment.getState())
                            .addValue("country", shipment.getCountry())
                            .addValue("phone", shipment.getPhone())
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }



}
