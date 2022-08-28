package com.ecommerce.repository;

import com.ecommerce.mapper.CartItemsMapper;
import com.ecommerce.model.response.CartItemsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartRepositoryJdbc {

    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    CartItemsMapper cartItemsMapper;

    private static final String ASSIGN_NEW_CART =
            "-- stmt: ASSIGN_NEW_CART\n " +
            "insert into cart_ref " +
            "( " +
            "   cart_uuid " +
            ") " +
            "values " +
            "( " +
            "   :cartUuid " +
            ") ";

    private static final String INSERT_ITEM_INTO_CART =
            "-- stmt: INSERT_ITEM_INTO_CART\n " +
            "insert into cart " +
            "( " +
            "   cart_ref, " +
            "   product_id, " +
            "   qty " +
            ") " +
            "values " +
            "( " +
            "   (select cart_ref_id from cart_ref where cart_uuid = :cartUuid), " +
            "   (select product_id from product where product_uuid = :productUuid), " +
            "   :qty " +
            ") ";

    private static final String UPDATE_ITEM_QTY_IN_CART =
            "-- stmt: UPDATE_ITEM_QTY_IN_CART\n " +
            "update cart, " +
            "       cart_ref, " +
            "       product " +
            "set " +
            "   cart.qty = :qty " +
            "where " +
            "    cart_ref.cart_ref_id = cart.cart_ref " +
            "and product.product_id = cart.product_id " +
            "and cart_ref.cart_uuid    = :cartUuid " +
            "and product.product_uuid = :productUuid ";

    private static final String DELETE_PRODUCT_IN_CART_BY_PRODUCT_ID =
            "-- stmt: DELETE_PRODUCT_IN_CART_BY_PRODUCT_ID\n " +
            "delete cart from " +
            "   cart " +
            "   join cart_ref on (cart_ref.cart_ref_id = cart.cart_ref) " +
            "   join product on (product.product_id = cart.product_id) " +
            "where " +
            "    cart_ref.cart_uuid   = :cartUuid " +
            "and product.product_uuid = :productUuid ";

    private static final String DELETE_PRODUCTS_IN_CART_BY_CART_UUID =
            "-- stmt: DELETE_PRODUCTS_IN_CART_BY_CART_UUID\n " +
            "delete c from " +
            "   cart c" +
            "   join cart_ref cr on (cr.cart_ref_id = c.cart_ref) " +
            "where " +
            "    cr.cart_uuid   = :cartUuid ";

    private static final String GET_CART_ITEMS_BY_CART_UUID =
            "-- stmt: GET_CART_ITEMS_BY_CART_ID\n " +
            "select " +
            "   cf.cart_uuid, " +
            "   c.qty, " +
            "   p.product_uuid, " +
            "   p.name, " +
            "   p.unit_price, " +
            "   p.img " +
            "from " +
            "       cart     c " +
            "join   cart_ref cf on (c.cart_ref = cf.cart_ref_id) " +
            "join   product  p on (c.product_id = p.product_id) " +
            "where " +
            "   cf.cart_uuid = :cartUuid";

    private static final String GET_CART_UUID_BY_CUSTOMER =
            "-- stmt: GET_CART_UUID_BY_CUSTOMER\n " +
            "select " +
            "   cf.cart_uuid " +
            "from " +
            "        cart cf " +
            "   join customer c on (c.cart_ref = cf.cart_ref_id) " +
            "where " +
            "   customer_uuid = :customerUuid ";

    private static final String GET_CART_REF_BY_UUID =
            "-- stmt: GET_CART_REF_BY_UUID\n " +
            "select " +
            "   cart_ref_id " +
            "from " +
            "   cart " +
            "where " +
            "   cart_uuid = :cartUuid ";

    public void deleteProductInCartByProductId(String cartId, String productId) {
        int rows = this.jdbcTemplate.update(
                DELETE_PRODUCT_IN_CART_BY_PRODUCT_ID,
                new MapSqlParameterSource("productUuid", productId)
                        .addValue("cartUuid", cartId)
        );
        if (rows <= 0) {
            // log
        }
    }

    public void deleteProductsInCartByCartId(String cartId) {
        int rows = this.jdbcTemplate.update(
                DELETE_PRODUCTS_IN_CART_BY_CART_UUID,
                new MapSqlParameterSource("cartUuid", cartId)
        );
        if (rows <= 0) {
            // log
        }
    }


    public List<CartItemsModel> getCartItemsByCartId(String cartUuid) {
        try {
            List<CartItemsModel> cartItems = this.jdbcTemplate.query(
                    GET_CART_ITEMS_BY_CART_UUID,
                    new MapSqlParameterSource()
                            .addValue("cartUuid", cartUuid),
                    cartItemsMapper
            );
            return cartItems;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void insertCartItem(String cartId, String productId, int qty) {
        try {
            this.jdbcTemplate.update(
                    INSERT_ITEM_INTO_CART,
                    new MapSqlParameterSource("cartUuid", cartId)
                            .addValue("productUuid", productId)
                            .addValue("qty", qty)
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }

    public void updateCartItem(String cartId, String productId, int qty) {
        try {
            this.jdbcTemplate.update(
                    UPDATE_ITEM_QTY_IN_CART,
                    new MapSqlParameterSource("cartUuid", cartId)
                            .addValue("productUuid", productId)
                            .addValue("qty", qty)
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }

    public String getCartUuidByCustomer(String customerUuid) {
        try {
            String cartUuid = this.jdbcTemplate.queryForObject(
                    GET_CART_UUID_BY_CUSTOMER,
                    new MapSqlParameterSource("customerUuid", customerUuid),
                    String.class
            );
            return cartUuid;
        } catch (Exception exception) {
            throw exception;
        }
    }


    public void assignNewCart(String cartUuid) {
        try {
            this.jdbcTemplate.update(
                    ASSIGN_NEW_CART,
                    new MapSqlParameterSource("cartUuid", cartUuid)
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }

    public int getCartRefByUuid(String cartUuid) {
        try {
            Integer cartRef = this.jdbcTemplate.queryForObject(
                    GET_CART_REF_BY_UUID,
                    new MapSqlParameterSource("cartUuid", cartUuid),
                    Integer.class
            );
            return cartRef;
        } catch (Exception exception) {
            throw exception;
        }
    }



}
