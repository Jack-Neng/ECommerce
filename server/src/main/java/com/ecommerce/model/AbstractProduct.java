package com.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.UUID;

public abstract class AbstractProduct {
    private int productRef;
    private UUID productId;
    private String name;
    private String description;
    private Double unitPrice;
    private String department;
    private String img;

    public AbstractProduct() {
    }

    public AbstractProduct(int productRef, UUID productId, String name, String description, Double unitPrice, String department, String img) {
        this.productRef = productRef;
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.department = department;
        this.img = img;
    }

    public AbstractProduct(AbstractProduct product) {
        this.productRef = product.getProductRef();
        this.productId = product.getProductId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.unitPrice = product.getUnitPrice();
        this.department = product.getDepartment();
        this.img = product.getImg();
    }

    public int getProductRef() {
        return productRef;
    }

    public void setProductRef(int productRef) {
        this.productRef = productRef;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
