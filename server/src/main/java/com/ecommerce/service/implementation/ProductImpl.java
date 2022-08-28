package com.ecommerce.service.implementation;

import com.ecommerce.model.ProductModel;
import com.ecommerce.repository.ProductRepositoryJdbc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductImpl {

    @Autowired
    private ProductRepositoryJdbc productRepository;

    public List<ProductModel> getProductsByDepartmentByName(String department, String name) {
        return productRepository.getAllProductsByFilter(department, name);
    }

    public ProductModel getProductById(String productUuid) {
        return productRepository.getProductByUuid(productUuid);
    }

    public void insertProduct(ProductModel product) {
        productRepository.insertProduct(product);
    }
}
