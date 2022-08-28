package com.ecommerce.model.response;

import java.util.UUID;

public class FavouriteItemsModel {

    private UUID productId;
    private UUID customerId;
    private String name;
    private String description;
    private Double unitPrice;
    private String img;

    public FavouriteItemsModel(UUID productId, UUID customerId, String name, String description, Double unitPrice, String img) {
        this.productId = productId;
        this.customerId = customerId;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.img = img;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public UUID getCustomerId() {
        return customerId;
    }

    public void setCustomerId(UUID customerId) {
        this.customerId = customerId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
