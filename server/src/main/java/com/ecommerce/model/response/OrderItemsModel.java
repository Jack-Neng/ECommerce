package com.ecommerce.model.response;

import java.time.LocalDateTime;
import java.util.UUID;

public class OrderItemsModel {

    private Integer qty;
    private UUID productId;
    private String name;
    private Double unitPrice;
    private String img;
    private LocalDateTime shippedDate;
    private String status;
    private int orderRef;

    public OrderItemsModel(Integer qty, UUID productId, String name, Double unitPrice, String img, LocalDateTime shippedDate, String status, int orderRef) {
        this.qty = qty;
        this.productId = productId;
        this.name = name;
        this.unitPrice = unitPrice;
        this.img = img;
        this.shippedDate = shippedDate;
        this.status = status;
        this.orderRef = orderRef;
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

    public LocalDateTime getShippedDate() {
        return shippedDate;
    }

    public void setShippedDate(LocalDateTime shippedDate) {
        this.shippedDate = shippedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getOrderRef() {
        return orderRef;
    }

    public void setOrderRef(int orderRef) {
        this.orderRef = orderRef;
    }
}
