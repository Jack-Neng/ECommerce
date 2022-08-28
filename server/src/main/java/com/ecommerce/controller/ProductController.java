package com.ecommerce.controller;

import java.util.List;
import java.util.UUID;

import com.ecommerce.model.AbstractProduct;
import com.ecommerce.model.ProductModel;
import com.ecommerce.service.implementation.ProductImpl;
import com.ecommerce.service.manager.ProductManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;


@RestController
@Validated
@RequestMapping(value = "/product", produces = "application/json")
public class ProductController {

    @Autowired
    private ProductImpl productImpl;

    @Autowired
    private ProductManager productManager;

    @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ProductModel addNewCart(@RequestBody ProductModel newProduct) {
        productImpl.insertProduct(newProduct);
        return newProduct;
    }

    @GetMapping(path = "/{productId}")
    public AbstractProduct getProductById(@PathVariable UUID productId) {
        AbstractProduct product = productManager.getProductById(productId.toString());
        return product;
    }

    @GetMapping(produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<? extends AbstractProduct> getProductByFilter(
            @RequestParam(required = false, defaultValue = "") String department,
            @RequestParam(required = false, defaultValue = "") String search
    ) {
        List<? extends AbstractProduct> products = productManager.getProducts(department, search);
        return products;
    }

}
