package com.ecommerce.service.implementation;

import com.ecommerce.model.response.FavouriteItemsModel;
import com.ecommerce.repository.FavouriteRepositoryJdbc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class FavouriteImpl {

    @Autowired
    private FavouriteRepositoryJdbc favouriteRepository;

    public List<FavouriteItemsModel> getFavouriteItems(UUID customerId) {
        List<FavouriteItemsModel> favouriteItems = favouriteRepository.getFavouriteItemsByCustomerId(customerId.toString());
        return favouriteItems;
    }

    public FavouriteItemsModel getFavouriteItem(UUID customerId, UUID productId) {
        FavouriteItemsModel favouriteItem = favouriteRepository.getFavouriteItemByCustomerId(customerId.toString(), productId.toString());
        return favouriteItem;
    }

    public void addFavouriteItem(UUID customerId, UUID productId) {
        favouriteRepository.insertFavouriteItem(customerId.toString(), productId.toString());
    }

    public void deleteProductInFavourite(UUID customerId, UUID productId) {
        favouriteRepository.deleteProductInFavouriteByProductId(customerId.toString(), productId.toString());
    }

    public void emptyFavourite(UUID customerId) {
        favouriteRepository.deleteProductsInFavouriteByCustomerId(customerId.toString());
    }


}
