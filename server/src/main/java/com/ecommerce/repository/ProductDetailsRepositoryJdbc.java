package com.ecommerce.repository;

import com.ecommerce.mapper.Product.*;
import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.model.ProductModel;
import com.ecommerce.model.product.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Repository
public class ProductDetailsRepositoryJdbc {

    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    ClothesDetailsMapper clothesDetailsMapper;

    @Autowired
    ElectronicsDetailsMapper electronicsDetailsMapper;

    @Autowired
    GroceryDetailsMapper groceryDetailsMapper;

    @Autowired
    HomeDetailsMapper homeDetailsMapper;

    @Autowired
    SportsDetailsMapper sportsDetailsMapper;


    private static final String GET_CLOTHES_DETAILS =
            "-- stmt: GET_CLOTHES_DETAILS\n " +
                    "select " +
                    "   product_id, " +
                    "   size, " +
                    "   colour, " +
                    "   gender " +
                    "from " +
                    "   clothes_product " +
                    "where " +
                    "   1 = 1 ";

    private static final String GET_ELECTRONICS_DETAILS =
            "-- stmt: GET_ELECTRONICS_DETAILS\n " +
                    "select " +
                    "   product_id, " +
                    "   type, " +
                    "   brand " +
                    "from " +
                    "   electronics_product " +
                    "where " +
                    "   1 = 1 ";

    private static final String GET_GROCERY_DETAILS =
            "-- stmt: GET_GROCERY_DETAILS\n " +
                    "select " +
                    "   product_id, " +
                    "   type " +
                    "from " +
                    "   grocery_product " +
                    "where " +
                    "   1 = 1 ";

    private static final String GET_HOME_DETAILS =
            "-- stmt: GET_HOME_DETAILS\n " +
                    "select " +
                    "   product_id, " +
                    "   location, " +
                    "   type " +
                    "from " +
                    "   home_product " +
                    "where " +
                    "   1 = 1 ";

    private static final String GET_SPORTS_DETAILS =
            "-- stmt: GET_SPORTS_DETAILS\n " +
                    "select " +
                    "   product_id, " +
                    "   type, " +
                    "   size " +
                    "from " +
                    "   sports_product " +
                    "where " +
                    "   1 = 1 ";

    private static final String _BY_PRODUCT_ID =
            "and product_id = :productId";

    private static final String _BY_PRODUCT_IDS =
            "and product_id in (:productIds)";

    private static final String GET_CLOTHES_DETAILS_BY_PRODUCT_ID =
            GET_CLOTHES_DETAILS + _BY_PRODUCT_ID;

    private static final String GET_ELECTRONICS_DETAILS_BY_PRODUCT_ID =
            GET_ELECTRONICS_DETAILS + _BY_PRODUCT_ID;

    private static final String GET_GROCERY_DETAILS_BY_PRODUCT_ID =
            GET_GROCERY_DETAILS + _BY_PRODUCT_ID;

    private static final String GET_HOME_DETAILS_BY_PRODUCT_ID =
            GET_HOME_DETAILS + _BY_PRODUCT_ID;

    private static final String GET_SPORTS_DETAILS_BY_PRODUCT_ID =
            GET_SPORTS_DETAILS + _BY_PRODUCT_ID;


    private static final String GET_CLOTHES_DETAILS_BY_PRODUCT_IDS =
            GET_CLOTHES_DETAILS + _BY_PRODUCT_IDS;

    private static final String GET_ELECTRONICS_DETAILS_BY_PRODUCT_IDS =
            GET_ELECTRONICS_DETAILS + _BY_PRODUCT_IDS;

    private static final String GET_GROCERY_DETAILS_BY_PRODUCT_IDS =
            GET_GROCERY_DETAILS + _BY_PRODUCT_IDS;

    private static final String GET_HOME_DETAILS_BY_PRODUCT_IDS =
            GET_HOME_DETAILS + _BY_PRODUCT_IDS;

    private static final String GET_SPORTS_DETAILS_BY_PRODUCT_IDS =
            GET_SPORTS_DETAILS + _BY_PRODUCT_IDS;


    public ClothesProductDetails getClothesProduct(int productId) {
        try {
            ClothesProductDetails details = this.jdbcTemplate.queryForObject(
                    GET_CLOTHES_DETAILS_BY_PRODUCT_ID,
                    new MapSqlParameterSource("productId", productId),
                    clothesDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public ElectronicsProductDetails getElectronicsProduct(int productId) {
        try {
            ElectronicsProductDetails details = this.jdbcTemplate.queryForObject(
                    GET_ELECTRONICS_DETAILS_BY_PRODUCT_ID,
                    new MapSqlParameterSource("productId", productId),
                    electronicsDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public GroceryProductDetails getGroceryProduct(int productId) {
        try {
            GroceryProductDetails details = this.jdbcTemplate.queryForObject(
                    GET_GROCERY_DETAILS_BY_PRODUCT_ID,
                    new MapSqlParameterSource("productId", productId),
                    groceryDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public HomeProductDetails getHomeProduct(int productId) {
        try {
            HomeProductDetails details = this.jdbcTemplate.queryForObject(
                    GET_HOME_DETAILS_BY_PRODUCT_ID,
                    new MapSqlParameterSource("productId", productId),
                    homeDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public SportsProductDetails getSportsProduct(int productId) {
        try {
            SportsProductDetails details = this.jdbcTemplate.queryForObject(
                    GET_SPORTS_DETAILS_BY_PRODUCT_ID,
                    new MapSqlParameterSource("productId", productId),
                    sportsDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }


    public List<ClothesProductDetails> getClothesProducts(List<Integer> productIds) {
        try {
            List<ClothesProductDetails> details = this.jdbcTemplate.query(
                    GET_CLOTHES_DETAILS_BY_PRODUCT_IDS,
                    new MapSqlParameterSource("productIds", productIds),
                    clothesDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public List<ElectronicsProductDetails> getElectronicsProducts(List<Integer> productIds) {
        try {
            List<ElectronicsProductDetails> details = this.jdbcTemplate.query(
                    GET_ELECTRONICS_DETAILS_BY_PRODUCT_IDS,
                    new MapSqlParameterSource("productIds", productIds),
                    electronicsDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public List<GroceryProductDetails> getGroceryProducts(List<Integer> productIds) {
        try {
            List<GroceryProductDetails> details = this.jdbcTemplate.query(
                    GET_GROCERY_DETAILS_BY_PRODUCT_IDS,
                    new MapSqlParameterSource("productIds", productIds),
                    groceryDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public List<HomeProductDetails> getHomeProducts(List<Integer> productIds) {
        try {
            List<HomeProductDetails> details = this.jdbcTemplate.query(
                    GET_HOME_DETAILS_BY_PRODUCT_IDS,
                    new MapSqlParameterSource("productIds", productIds),
                    homeDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public List<SportsProductDetails> getSportsProducts(List<Integer> productIds) {
        try {
            List<SportsProductDetails> details = this.jdbcTemplate.query(
                    GET_SPORTS_DETAILS_BY_PRODUCT_IDS,
                    new MapSqlParameterSource("productIds", productIds),
                    sportsDetailsMapper
            );
            return details;
        } catch (Exception exception) {
            throw exception;
        }
    }


}
