package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProductDetails;

public class HomeProductDetails extends AbstractProductDetails {
    private int productId;
    private String location; // living room, bathroom...
    private String type; // desk, chair

    public HomeProductDetails(int productId, String location, String type) {
        this.productId = productId;
        this.location = location;
        this.type = type;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
