package com.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.entity.Cart;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Cart.CartKey> {

    public List<Cart> findByCartId(Integer cartId);

    @Transactional
    public void deleteByProductId(Integer productId);

    @Transactional
    public void deleteByCartId(Integer cartId);

    @Query(value = "SELECT cart.qty AS qty, product.product_id AS productId, product.product_name AS productName, product.unit_price AS unitPrice, product.img AS img  FROM cart cart JOIN product product ON cart.product_id = product.product_id WHERE cart.cart_id = :cartId", nativeQuery = true)
    List<CartResponseModel> getCartItem(@Param("cartId") Integer cartId);

    public static interface CartResponseModel {

        Integer getQty();

        Integer getProductId();

        String getProductName();

        Double getUnitPrice();

        String getImg();

    }

    @Modifying
    @Query(value = "INSERT INTO cart (cart_id, customer_id, product_id, qty) VALUES(:cartId, :customerId, :productId, :qty)", nativeQuery = true)
    @Transactional
    public void insertCartItem(@Param("cartId") Integer cartId, @Param("customerId") Integer customerId,
            @Param("productId") Integer productId, @Param("qty") Integer qty);

    @Modifying
    @Query(value = "UPDATE cart c SET c.qty = :qty WHERE c.cart_id = :cartId AND c.product_id = :productId", nativeQuery = true)
    @Transactional
    public void updateCartItem(@Param("cartId") Integer cartId, @Param("productId") Integer productId,
            @Param("qty") Integer qty);

    @Query(value = "SELECT c.cart_id FROM cart c", nativeQuery = true)
    public List<Integer> getCartIds();

}
