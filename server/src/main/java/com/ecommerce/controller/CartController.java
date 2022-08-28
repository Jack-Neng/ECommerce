package com.ecommerce.controller;

import java.util.List;
import java.util.UUID;

import com.ecommerce.model.CartModel;
import com.ecommerce.model.response.CartItemsModel;
import com.ecommerce.service.implementation.CartImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/cart")
public class CartController {

    @Autowired
    private CartImpl cartImpl;


    @GetMapping(path = "/getId")
    public String getCartIds() {
        return cartImpl.generateCartUuid();
    }

    @GetMapping(path = "/{cartId}")
    public List<CartItemsModel> getProductsInCart(@PathVariable UUID cartId) {
        return cartImpl.getCartItems(cartId);
    }

    @PostMapping(consumes = "application/json")
    public CartModel addNewCart(@RequestBody CartModel newCartItem) {
        cartImpl.addCartItem(newCartItem.getCartId(), newCartItem.getProductId(), newCartItem.getQty());
        return newCartItem;
    }

    @PutMapping(path = "/{cartId}", consumes = "application/json")
    public CartModel updateCartItem(@RequestBody CartModel cart) {
        cartImpl.updateCartItem(cart.getCartId(), cart.getProductId(), cart.getQty());
        return cart;
    }

    @DeleteMapping(path = "/{cartId}/{productId}")
    public String deleteProductInCart(
            @PathVariable UUID cartId,
            @PathVariable UUID productId
    ) {
        cartImpl.deleteProductInCart(cartId, productId);
        return "deleted";
    }

    @DeleteMapping(path = "/cart/{cartId}")
    public String deleteProductsInCart(@PathVariable UUID cartId) {
        cartImpl.emptyCart(cartId);
        return "emptied";
    }

}
