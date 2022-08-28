package com.ecommerce.service.provider.product;

import com.ecommerce.model.AbstractProduct;
import com.ecommerce.model.product.HomeProduct;
import com.ecommerce.model.product.HomeProductDetails;
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
public class HomeProductImpl extends AbstractProductProvider {
    private final static String PROVIDER_REF = "Home";

    @Autowired
    private ProductDetailsRepositoryJdbc productDetailsRepository;

    @Override
    public String getProviderRef() {
        return PROVIDER_REF;
    }

    @Override
    public AbstractProduct buildProduct(AbstractProduct product) {
        HomeProductDetails details = productDetailsRepository.getHomeProduct(product.getProductRef());
        HomeProduct completeProduct = new HomeProduct(product, details);
        return completeProduct;
    }

    @Override
    public List<AbstractProduct> buildProducts(List<? extends AbstractProduct> products) {
        List<AbstractProduct> completeProducts = new ArrayList<>();

        List<Integer> productIds = products.stream().map(product -> product.getProductRef()).collect(Collectors.toList());
        List<HomeProductDetails> detailsList = productDetailsRepository.getHomeProducts(productIds);

        Map<Integer, HomeProductDetails> productDetailsMap =
                detailsList.stream().collect(Collectors.toMap(HomeProductDetails::getProductId, Function.identity()));

        for (AbstractProduct product : products) {
            if (!(product.getDepartment().equals(PROVIDER_REF)) || (product instanceof HomeProduct)) {

            } else {
                if (productDetailsMap.containsKey(product.getProductRef())) {
                    HomeProduct completeProduct = new HomeProduct(product, productDetailsMap.get(product.getProductRef()));
                    completeProducts.add(completeProduct);
                } else {
                    completeProducts.add(product);
                }
            }
        }
        return completeProducts;
    }
}
