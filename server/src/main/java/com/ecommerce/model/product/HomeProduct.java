package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProduct;

public class HomeProduct extends AbstractProduct {
    private int productId;
    private String location; // living room, bathroom...
    private String type; // desk, chair

    public HomeProduct(AbstractProduct product, HomeProductDetails details) {
        super(product);
        this.productId = details.getProductId();
        this.location = details.getLocation();
        this.type = details.getType();
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
