package com.ecommerce.model;

import java.util.UUID;

public class ProductModel extends AbstractProduct {
    public ProductModel() {
    }

    public ProductModel(int productRef, UUID productId, String name, String description, Double unitPrice, String department, String img) {
        super(productRef, productId, name, description, unitPrice, department, img);
    }
}
