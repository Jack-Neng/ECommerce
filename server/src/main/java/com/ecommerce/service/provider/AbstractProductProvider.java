package com.ecommerce.service.provider;

import com.ecommerce.model.AbstractProduct;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public abstract class AbstractProductProvider {
    public abstract String getProviderRef();

    public abstract AbstractProduct buildProduct(AbstractProduct product);
    public abstract List<AbstractProduct> buildProducts(List<? extends AbstractProduct> product);

}
