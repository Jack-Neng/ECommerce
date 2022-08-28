package com.ecommerce.model;

import java.util.UUID;

public class CartModel {
    private UUID cartId;
    private UUID productId;
    private Integer qty;

    public CartModel(UUID cartId, UUID productId, Integer qty) {
        this.cartId = cartId;
        this.productId = productId;
        this.qty = qty;
    }

    public UUID getCartId() {
        return cartId;
    }

    public void setCartId(UUID cartId) {
        this.cartId = cartId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }
}
