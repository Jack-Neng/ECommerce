package com.ecommerce.model.response;

import com.ecommerce.model.JwtAuthenticationResponse;


public class LoginResponse {
    private String customerId;
    private String cartId;
    private String accessToken;

    public LoginResponse(String customerId, String cartId, String accessToken) {
        this.customerId = customerId;
        this.cartId = cartId;
        this.accessToken = accessToken;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
