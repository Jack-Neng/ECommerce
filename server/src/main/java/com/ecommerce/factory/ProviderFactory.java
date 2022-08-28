package com.ecommerce.factory;

import com.ecommerce.service.provider.AbstractProductProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class ProviderFactory {

    @Autowired
    List<AbstractProductProvider> productProviderList;

    private Map<String, AbstractProductProvider> productProviderMap;

    @Autowired
    public ProviderFactory(List<AbstractProductProvider> productProviders) {
        productProviderMap = productProviders.stream().collect(Collectors.toMap(AbstractProductProvider::getProviderRef, Function.identity()));
    }

    public AbstractProductProvider getProductProvider(String provider) {
        return productProviderMap.get(provider);
    }

    public List<AbstractProductProvider> getAllProductProviders() {
        return productProviderList;
    }
}
