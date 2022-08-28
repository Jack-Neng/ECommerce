package com.ecommerce.controller;

import com.ecommerce.model.FavouriteModel;
import com.ecommerce.model.response.FavouriteItemsModel;
import com.ecommerce.service.implementation.FavouriteImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(path = "/favourite")
public class FavouriteController {

    @Autowired
    private FavouriteImpl favouriteImpl;


    @GetMapping(path = "/{customerId}")
    public List<FavouriteItemsModel> getProductsInFavourite(@PathVariable UUID customerId) {
        return favouriteImpl.getFavouriteItems(customerId);
    }

    @GetMapping(path = "/{customerId}/{productId}")
    public FavouriteItemsModel getProductInFavourite(@PathVariable UUID customerId, @PathVariable UUID productId) {
        return favouriteImpl.getFavouriteItem(customerId, productId);
    }

    @PostMapping(consumes = "application/json")
    public FavouriteModel addNewFavourite(@RequestBody FavouriteModel newFavouriteItem) {
        favouriteImpl.addFavouriteItem(newFavouriteItem.getCustomerId(), newFavouriteItem.getProductId());
        return newFavouriteItem;
    }

    @DeleteMapping(path = "/{customerId}/{productId}")
    public String deleteProductInFavourite(
            @PathVariable UUID customerId,
            @PathVariable UUID productId
    ) {
        favouriteImpl.deleteProductInFavourite(customerId, productId);
        return "deleted";
    }

    @DeleteMapping(path = "/{customerId}/all")
    public String deleteProductsInFavourite(@PathVariable UUID customerId) {
        favouriteImpl.emptyFavourite(customerId);
        return "emptied";
    }

}
