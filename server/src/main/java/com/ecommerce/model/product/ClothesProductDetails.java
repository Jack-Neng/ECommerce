package com.ecommerce.model.product;

import com.ecommerce.model.AbstractProductDetails;

public class ClothesProductDetails extends AbstractProductDetails {
    private int productId;
    private String size;
    private String colour;
    private String gender;

    public ClothesProductDetails(int productId, String size, String colour, String gender) {
        this.productId = productId;
        this.size = size;
        this.colour = colour;
        this.gender = gender;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
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
