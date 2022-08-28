package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProduct;

public class ElectronicsProduct extends AbstractProduct {
    private int productId;
    private String type;  // computer, phone, vaccum
    private String brand; // Apple, Sony

    public ElectronicsProduct(AbstractProduct product, ElectronicsProductDetails details) {
        super(product);
        this.productId = details.getProductId();
        this.type = details.getType();
        this.brand = details.getBrand();
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
