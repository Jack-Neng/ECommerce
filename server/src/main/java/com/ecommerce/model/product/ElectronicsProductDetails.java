package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProductDetails;

public class ElectronicsProductDetails extends AbstractProductDetails {
    private int productId;
    private String type;  // computer, phone, vaccum
    private String brand; // Apple, Sony

    public ElectronicsProductDetails(int productId, String type, String brand) {
        this.productId = productId;
        this.type = type;
        this.brand = brand;
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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }
}
