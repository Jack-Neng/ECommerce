package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProduct;


public class SportsProduct extends AbstractProduct {
    private int productId;
    private String type;
    private String size;

    public SportsProduct(AbstractProduct product, SportsProductDetails details) {
        super(product);
        this.productId = details.getProductId();
        this.type = details.getType();
        this.size = details.getSize();
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
