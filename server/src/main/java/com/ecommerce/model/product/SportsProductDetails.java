package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProductDetails;


public class SportsProductDetails extends AbstractProductDetails {
    private int productId;
    private String type;
    private String size;

    public SportsProductDetails(int productId, String type, String size) {
        this.productId = productId;
        this.type = type;
        this.size = size;
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

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}
