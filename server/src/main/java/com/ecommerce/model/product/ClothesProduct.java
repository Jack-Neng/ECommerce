package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProduct;

public class ClothesProduct extends AbstractProduct {
    private int productId;
    private String size;
    private String colour;
    private String gender;

    public ClothesProduct(AbstractProduct product, ClothesProductDetails details) {
        super(product);
        this.productId = details.getProductId();
        this.size = details.getSize();
        this.colour = details.getColour();
        this.gender = details.getGender();
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
