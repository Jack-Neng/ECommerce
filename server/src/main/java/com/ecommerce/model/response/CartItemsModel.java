package com.ecommerce.model.response;

import java.util.UUID;

public class CartItemsModel {

    private Integer qty;
    private UUID productId;
    private String name;
    private Double unitPrice;
    private String img;

    public CartItemsModel(Integer qty, UUID productId, String name, Double unitPrice, String img) {
        this.qty = qty;
        this.productId = productId;
        this.name = name;
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

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }
}
