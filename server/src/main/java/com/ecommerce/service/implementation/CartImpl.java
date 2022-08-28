package com.ecommerce.service.implementation;

import com.ecommerce.model.response.CartItemsModel;
import com.ecommerce.repository.CartRepositoryJdbc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class CartImpl {

    @Autowired
    private CartRepositoryJdbc cartRepository;

    public List<Integer> getAllCarts() {
        return null;
    }

    public String generateCartUuid() {
        String uuid = UUID.randomUUID().toString();
        cartRepository.assignNewCart(uuid);
        return uuid;
    }

    public String getCartUuidByCustomerId(UUID customerUuid) {
        return cartRepository.getCartUuidByCustomer(customerUuid.toString());
    }

    public List<CartItemsModel> getCartItems(UUID cartUuid) {
        List<CartItemsModel> cartItems = cartRepository.getCartItemsByCartId(cartUuid.toString());
        return cartItems;
    }

    public void addCartItem(UUID cartUuid, UUID productId, int qty) {
        cartRepository.insertCartItem(cartUuid.toString(), productId.toString(), qty);
    }

    public void updateCartItem(UUID cartUuid, UUID productId, int qty) {
        cartRepository.updateCartItem(cartUuid.toString(), productId.toString(), qty);
    }

    public void deleteProductInCart(UUID cartUuid, UUID productId) {
        cartRepository.deleteProductInCartByProductId(cartUuid.toString(), productId.toString());
    }

    public void emptyCart(UUID cartUuid) {
        cartRepository.deleteProductsInCartByCartId(cartUuid.toString());
    }


}
