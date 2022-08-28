package com.ecommerce.model;

import java.util.UUID;

public class FavouriteModel {
    private int favouriteId;
    private UUID productId;
    private UUID customerId;

    public FavouriteModel(int favouriteId, UUID productId, UUID customerId) {
        this.favouriteId = favouriteId;
        this.productId = productId;
        this.customerId = customerId;
    }

    public int getFavouriteId() {
        return favouriteId;
    }

    public void setFavouriteId(int favouriteId) {
        this.favouriteId = favouriteId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public UUID getCustomerId() {
        return customerId;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

}
