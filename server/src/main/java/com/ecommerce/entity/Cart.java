package com.ecommerce.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.OneToMany;
import javax.persistence.Column;

import java.io.Serializable;

import java.util.List;

@Entity
@Table(name = "cart")
@IdClass(value = Cart.CartKey.class)
public class Cart {
	@Id
	@Column(name = "cart_id")
	private Integer cartId;
	@Id
	@Column(name = "product_id")
	private Integer productId;

	@Column(name = "customer_id")
	private Integer customerId;

	@Column(name = "qty")
	private Integer qty;

	public static class CartKey implements Serializable {
		private Integer cartId;
		private Integer productId;

		public CartKey() {
		}

		public CartKey(Integer cartId, Integer productId) {
			this.cartId = cartId;
			this.productId = productId;
		}

	}

	@OneToMany(mappedBy = "cart")
	private List<Product> products;

	public Cart() {

	}

	public Integer getCartId() {
		return cartId;
	}

	public void setCartId(Integer cartId) {
		this.cartId = cartId;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}
}