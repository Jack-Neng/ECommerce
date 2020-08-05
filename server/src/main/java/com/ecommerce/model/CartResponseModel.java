package com.ecommerce.model;

public class CartResponseModel {

    private Integer qty;
    private Integer productId;
    private String productName;
    private Double unitPrice;
    private String img;

    public CartResponseModel(Integer qty, Integer productId, String productName, Double unitPrice, String img) {
        this.qty = qty;
        this.productId = productId;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.img = img;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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
