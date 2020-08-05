package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.MediaType;

import com.ecommerce.entity.Cart;
import com.ecommerce.repository.CartRepository;

@Controller
@RequestMapping(path = "/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;

    @GetMapping()
    public @ResponseBody Iterable<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @GetMapping(path = "/getId")
    public @ResponseBody List<Integer> getCartIds() {
        return cartRepository.getCartIds();
    }

    @GetMapping(path = "/{cartId}")
    public @ResponseBody List<CartRepository.CartResponseModel> getProductsInCart(@PathVariable Integer cartId) {
        return cartRepository.getCartItem(cartId);
    }

    @GetMapping(path = "/{cartId}/{productId}")
    public @ResponseBody Integer getProductInCart(@PathVariable Integer cartId, @PathVariable Integer productId) {
        List<Cart> carts = cartRepository.findByCartId(cartId);
        for (Cart cart : carts) {
            if (cart.getProductId().equals(productId)) {
                return cart.getQty();
            }
        }
        return 0;
    }

    @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String addNewCart(@RequestBody Cart newCart) {
        cartRepository.insertCartItem(newCart.getCartId(), newCart.getCustomerId(), newCart.getProductId(),
                newCart.getQty());
        return "saved";
    }

    @PutMapping(path = "/{cartId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String updateCartItem(@RequestBody Cart cart) {
        cartRepository.updateCartItem(cart.getCartId(), cart.getProductId(), cart.getQty());
        return "updated";
    }

    @DeleteMapping(path = "/{productId}")
    public @ResponseBody String deleteProductInCart(@PathVariable Integer productId) {
        cartRepository.deleteByProductId(productId);
        return "deleted";
    }

    @DeleteMapping(path = "/cart/{cartId}")
    public @ResponseBody String deleteProductsInCart(@PathVariable Integer cartId) {
        cartRepository.deleteByCartId(cartId);
        return "emptied";
    }

}
