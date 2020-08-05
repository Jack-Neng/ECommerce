package com.ecommerce.controller;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.MediaType;

import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;

@Controller
@RequestMapping(path = "/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Product addNewCart(@RequestBody Product newProduct) {
        Product product = new Product();
        product.setProductId(newProduct.getProductId());
        product.setProductName(newProduct.getProductName());
        product.setProductDescription(newProduct.getProductDescription());
        product.setUnitPrice(newProduct.getUnitPrice());
        product.setDepartment(newProduct.getDepartment());
        product.setImg(newProduct.getImg());
        productRepository.save(product);
        return product;
    }

    @GetMapping()
    public @ResponseBody Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping(path = "/{productId}")
    public @ResponseBody Product getProductById(@PathVariable Integer productId) {
        Optional<Product> optinalEntity = productRepository.findById(productId);
        Product product = optinalEntity.get();
        return product;
    }

    @GetMapping(path = "/department={department}")
    public @ResponseBody List<Product> getProductByDepartment(@PathVariable String department) {
        return productRepository.findByDepartment(department);
    }

    @GetMapping(path = "/search={name}")
    public @ResponseBody List<Product> getProductByName(@PathVariable String name) {
        return productRepository.findByName(name);
    }

}
