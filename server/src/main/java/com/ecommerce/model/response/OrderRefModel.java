package com.ecommerce.model.response;

import com.ecommerce.model.ShipmentModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class OrderRefModel {
    private UUID orderId;
    private int orderRef;
    private LocalDateTime createDate;
    private String email;
    private double totalPrice;
    private List<OrderItemsModel> items;
    private ShipmentModel shipment;

    public OrderRefModel() {
    }

    public OrderRefModel(UUID orderId, int orderRef, LocalDateTime createDate, String email, double totalPrice) {
        this.orderRef = orderRef;
        this.orderId = orderId;
        this.createDate = createDate;
        this.email = email;
        this.totalPrice = totalPrice;
    }

    public OrderRefModel(UUID orderId, LocalDateTime createDate, String email, double totalPrice, List<OrderItemsModel> items, ShipmentModel shipment) {
        this.orderId = orderId;
        this.createDate = createDate;
        this.email = email;
        this.totalPrice = totalPrice;
        this.items = items;
        this.shipment = shipment;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<OrderItemsModel> getItems() {
        return items;
    }

    public void setItems(List<OrderItemsModel> items) {
        this.items = items;
    }

    public ShipmentModel getShipment() {
        return shipment;
    }

    public void setShipment(ShipmentModel shipment) {
        this.shipment = shipment;
    }

    public int getOrderRef() {
        return orderRef;
    }

    public void setOrderRef(int orderRef) {
        this.orderRef = orderRef;
    }
}
