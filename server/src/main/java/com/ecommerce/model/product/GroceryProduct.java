package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProduct;

public class GroceryProduct extends AbstractProduct {
    private int productId;
    private String type; // meat or veg or fruit or drink

    public GroceryProduct(AbstractProduct product, GroceryProductDetails details) {
        super(product);
        this.productId = details.getProductId();
        this.type = details.getType();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
