package com.ecommerce.service.provider.product;

import com.ecommerce.model.AbstractProduct;
import com.ecommerce.model.product.ClothesProduct;
import com.ecommerce.model.product.ClothesProductDetails;
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
public class ClothesProductImpl extends AbstractProductProvider {
    private final static String PROVIDER_REF = "Clothes";

    @Autowired
    private ProductDetailsRepositoryJdbc productDetailsRepository;

    @Override
    public String getProviderRef() {
        return PROVIDER_REF;
    }

    @Override
    public AbstractProduct buildProduct(AbstractProduct product) {
        ClothesProductDetails details = productDetailsRepository.getClothesProduct(product.getProductRef());
        ClothesProduct completeProduct = new ClothesProduct(product, details);
        return completeProduct;
    }

    @Override
    public List<AbstractProduct> buildProducts(List<? extends AbstractProduct> products) {
        List<AbstractProduct> completeProducts = new ArrayList<>();

        List<Integer> productIds = products.stream().map(product -> product.getProductRef()).collect(Collectors.toList());
        List<ClothesProductDetails> detailsList = productDetailsRepository.getClothesProducts(productIds);

        Map<Integer, ClothesProductDetails> productDetailsMap =
                detailsList.stream().collect(Collectors.toMap(ClothesProductDetails::getProductId, Function.identity()));

        for (AbstractProduct product : products) {
            if (!(product.getDepartment().equals(PROVIDER_REF)) || (product instanceof ClothesProduct)) {

            } else {
                if (productDetailsMap.containsKey(product.getProductRef())) {
                    ClothesProduct completeProduct = new ClothesProduct(product, productDetailsMap.get(product.getProductRef()));
                    completeProducts.add(completeProduct);
                } else {
                    completeProducts.add(product);
                }
            }
        }
        return completeProducts;
    }
}
