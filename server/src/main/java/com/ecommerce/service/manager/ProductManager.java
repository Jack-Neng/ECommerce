package com.ecommerce.service.manager;

import com.ecommerce.factory.ProviderFactory;
import com.ecommerce.model.AbstractProduct;
import com.ecommerce.model.ProductModel;
import com.ecommerce.repository.ProductRepositoryJdbc;
import com.ecommerce.service.provider.AbstractProductProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductManager {
    @Autowired
    private ProductRepositoryJdbc productRepository;

    @Autowired
    private ProviderFactory providerFactory;

    public AbstractProduct getProductById(String id) {
        ProductModel baseProduct = productRepository.getProductByUuid(id);
        AbstractProductProvider provider = providerFactory.getProductProvider(baseProduct.getDepartment());
        AbstractProduct product = provider.buildProduct(baseProduct);
        return product;
    }

    public List<? extends AbstractProduct> getProducts(String department, String search) {
        List<ProductModel> products = productRepository.getAllProductsByFilter(department, search);
        List<AbstractProduct> completeProducts = new ArrayList<>();

        for (AbstractProductProvider provider : providerFactory.getAllProductProviders()) {
            completeProducts.addAll(provider.buildProducts(products));
        }

        return completeProducts;
    }
}
