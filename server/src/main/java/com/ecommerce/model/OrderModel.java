package com.ecommerce.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class OrderModel {
    private UUID orderId;
    private UUID productId;
    private Integer qty;
    private LocalDateTime shippedDate;
    private String status;

    public LocalDateTime getShippedDate() {
        return shippedDate;
    }

    public void setShippedDate(LocalDateTime shippedDate) {
        this.shippedDate = shippedDate;
    }

    public OrderModel(UUID orderId, UUID productId, Integer qty, LocalDateTime shippedDate, String status) {
        this.orderId = orderId;
        this.productId = productId;
        this.qty = qty;
        this.shippedDate = shippedDate;
        this.status = status;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
