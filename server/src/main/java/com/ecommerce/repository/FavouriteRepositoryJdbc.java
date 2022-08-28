package com.ecommerce.repository;

import com.ecommerce.mapper.FavouriteItemsMapper;
import com.ecommerce.model.response.FavouriteItemsModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FavouriteRepositoryJdbc {

    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    FavouriteItemsMapper favouriteItemsMapper;

    private static final String INSERT_ITEM_INTO_FAVOURITE =
            "-- stmt: INSERT_ITEM_INTO_FAVOURITE\n " +
            "insert into favourite " +
            "( " +
            "   customer_id, " +
            "   product_id " +
            ") " +
            "values " +
            "( " +
            "   (select customer_id from customer where customer_uuid = :customerUuid), " +
            "   (select product_id from product where product_uuid = :productUuid) " +
            ") ";

    private static final String DELETE_PRODUCT_IN_CART_BY_PRODUCT_ID =
            "-- stmt: DELETE_PRODUCT_IN_CART_BY_PRODUCT_ID\n " +
            "delete favourite from " +
            "   favourite " +
            "   join customer on (customer.customer_id = favourite.customer_id) " +
            "   join product on (product.product_id = favourite.product_id) " +
            "where " +
            "    customer.customer_uuid   = :customerUuid " +
            "and product.product_uuid = :productUuid ";

    private static final String DELETE_PRODUCTS_IN_CART_BY_CUSTOMER_ID =
            "-- stmt: DELETE_PRODUCTS_IN_CART_BY_CUSTOMER_ID\n " +
            "delete from " +
            "   favourite " +
            "   join customer on (customer.customer_id = favourite.customer_id) " +
            "where " +
            "    customer.customer_uuid   = :customerUuid ";

    private static final String GET_FAVOURITE_ITEMS_BY_CUSTOMER_UUID =
            "-- stmt: GET_CART_ITEMS_BY_CART_ID\n " +
            "select " +
            "   f.favourite_id, " +
            "   p.product_uuid, " +
            "   p.name, " +
            "   p.description, " +
            "   p.unit_price, " +
            "   p.img, " +
            "   c.customer_uuid " +
            "from " +
            "       favourite     f " +
            "left join   customer c on (c.customer_id = f.customer_id) " +
            "left join   product  p on (p.product_id = f.product_id) " +
            "where " +
            "   c.customer_uuid = :customerUuid";

    private static final String GET_FAVOURITE_ITEM_BY_CUSTOMER_UUID =
            GET_FAVOURITE_ITEMS_BY_CUSTOMER_UUID +
            " and p.product_uuid = :productUuid";

    public void deleteProductInFavouriteByProductId(String customerId, String productId) {
        int rows = this.jdbcTemplate.update(
                DELETE_PRODUCT_IN_CART_BY_PRODUCT_ID,
                new MapSqlParameterSource("productUuid", productId)
                        .addValue("customerUuid", customerId)
        );
        if (rows <= 0) {
            // log
        }
    }

    public void deleteProductsInFavouriteByCustomerId(String customerId) {
        int rows = this.jdbcTemplate.update(
                DELETE_PRODUCTS_IN_CART_BY_CUSTOMER_ID,
                new MapSqlParameterSource("customerUuid", customerId)
        );
        if (rows <= 0) {
            // log
        }
    }

    public List<FavouriteItemsModel> getFavouriteItemsByCustomerId(String customerUuid) {
        try {
            List<FavouriteItemsModel> favouriteItems = this.jdbcTemplate.query(
                    GET_FAVOURITE_ITEMS_BY_CUSTOMER_UUID,
                    new MapSqlParameterSource()
                            .addValue("customerUuid", customerUuid),
                    favouriteItemsMapper
            );
            return favouriteItems;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public FavouriteItemsModel getFavouriteItemByCustomerId(String customerUuid, String productUuid) {
        try {
            FavouriteItemsModel favouriteItem = this.jdbcTemplate.queryForObject(
                    GET_FAVOURITE_ITEM_BY_CUSTOMER_UUID,
                    new MapSqlParameterSource()
                            .addValue("customerUuid", customerUuid)
                            .addValue("productUuid", productUuid),
                    favouriteItemsMapper
            );
            return favouriteItem;
        } catch (EmptyResultDataAccessException exception) {
            return null;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public void insertFavouriteItem(String customerUuid, String productId) {
        try {
            this.jdbcTemplate.update(
                    INSERT_ITEM_INTO_FAVOURITE,
                    new MapSqlParameterSource("customerUuid", customerUuid)
                            .addValue("productUuid", productId)
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }



}
