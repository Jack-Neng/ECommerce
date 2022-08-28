package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProductDetails;

public class GroceryProductDetails extends AbstractProductDetails {
    private int productId;
    private String type; // meat or veg or fruit or drink

    public GroceryProductDetails(int productId, String type) {
        this.productId = productId;
        this.type = type;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
