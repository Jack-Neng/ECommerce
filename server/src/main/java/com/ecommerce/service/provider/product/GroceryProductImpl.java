package com.ecommerce.service.provider.product;

import com.ecommerce.model.AbstractProduct;
import com.ecommerce.model.product.GroceryProduct;
import com.ecommerce.model.product.GroceryProductDetails;
import com.ecommerce.repository.ProductDetailsRepositoryJdbc;
import com.ecommerce.service.provider.AbstractProductProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class GroceryProductImpl extends AbstractProductProvider {
    private final static String PROVIDER_REF = "Grocery";

    @Autowired
    private ProductDetailsRepositoryJdbc productDetailsRepository;

    @Override
    public String getProviderRef() {
        return PROVIDER_REF;
    }

    @Override
    public AbstractProduct buildProduct(AbstractProduct product) {
        GroceryProductDetails details = productDetailsRepository.getGroceryProduct(product.getProductRef());
        GroceryProduct completeProduct = new GroceryProduct(product, details);
        return completeProduct;
    }

    @Override
    public List<AbstractProduct> buildProducts(List<? extends AbstractProduct> products) {
        List<AbstractProduct> completeProducts = new ArrayList<>();

        List<Integer> productIds = products.stream().map(product -> product.getProductRef()).collect(Collectors.toList());
        List<GroceryProductDetails> detailsList = productDetailsRepository.getGroceryProducts(productIds);

        Map<Integer, GroceryProductDetails> productDetailsMap =
                detailsList.stream().collect(Collectors.toMap(GroceryProductDetails::getProductId, Function.identity()));

        for (AbstractProduct product : products) {
            if (!(product.getDepartment().equals(PROVIDER_REF)) || (product instanceof GroceryProduct)) {

            } else {
                if (productDetailsMap.containsKey(product.getProductRef())) {
                    GroceryProduct completeProduct = new GroceryProduct(product, productDetailsMap.get(product.getProductRef()));
                    completeProducts.add(completeProduct);
                } else {
                    completeProducts.add(product);
                }
            }
        }
        return completeProducts;
    }
}
