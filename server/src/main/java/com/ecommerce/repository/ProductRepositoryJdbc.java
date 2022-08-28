package com.ecommerce.repository;

import com.ecommerce.mapper.ProductMapper;
import com.ecommerce.model.ProductModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Repository
public class ProductRepositoryJdbc {

    @Autowired
    NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    ProductMapper productMapper;


    private static final String GET_PRODUCTS =
            "-- stmt: GET_PRODUCTS\n " +
            "select " +
            "   product_id, " +
            "   product_uuid, " +
            "   department, " +
            "   name, " +
            "   description, " +
            "   unit_price, " +
            "   img " +
            "from " +
            "   product " +
            "where " +
            "   1 = 1";

    private static final String _BY_PRODUCT_UUID =
            "-- stmt: _BY_PRODUCT_UUID\n " +
            "   and product_uuid = :productUuid";

    private static final String _BY_DEPARTMENT =
            "-- stmt: _BY_DEPARTMENT\n " +
            "   and department = :department";

    private static final String _BY_NAME_LIKE =
            "-- stmt: _BY_NAME_LIKE\n " +
            "   and name like :name";


    private static final String INSERT_INTO_PRODUCT =
            "-- stmt: INSERT_INTO_PRODUCT\n " +
            "insert into product " +
            "( " +
            "   product_uuid, " +
            "   name, " +
            "   description, " +
            "   department, " +
            "   unit_price, " +
            "   img " +
            ") " +
            "values " +
            "( " +
            "   :productUuid, " +
            "   :name, " +
            "   :description, " +
            "   :department, " +
            "   :unitPrice, " +
            "   :img " +
            ")";


    public ProductModel getProductByUuid(String productUuid) {
        try {
            ProductModel product = this.jdbcTemplate.queryForObject(
                    GET_PRODUCTS+_BY_PRODUCT_UUID,
                    new MapSqlParameterSource("productUuid", productUuid),
                    productMapper
            );
            return product;
        } catch (Exception exception) {
            throw exception;
        }
    }

    public List<ProductModel> getAllProductsByFilter(String department, String name) {
        try {
            List<ProductModel> products = this.jdbcTemplate.query(
                    GET_PRODUCTS+
                            (ObjectUtils.isEmpty(department) ? "" : _BY_DEPARTMENT)+
                            (ObjectUtils.isEmpty(name) ? "" : _BY_NAME_LIKE),
                    new MapSqlParameterSource("department", department)
                            .addValue("name", "%"+name+"%"),
                    productMapper
            );
            return products;
        } catch (Exception exception) {
            throw exception;
        }
    }


    public void insertProduct(ProductModel product) {
        try {
            this.jdbcTemplate.update(
                    INSERT_INTO_PRODUCT,
                    new MapSqlParameterSource("productUuid", product.getProductId())
                            .addValue("name", product.getName())
                            .addValue("description", product.getDescription())
                            .addValue("department", product.getDepartment())
                            .addValue("unitPrice", product.getUnitPrice())
                            .addValue("img", product.getImg())
            );
        } catch (DuplicateKeyException exception) {
            throw exception;
        }
    }



}
