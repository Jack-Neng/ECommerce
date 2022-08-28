package com.ecommerce.controller;

import com.ecommerce.model.OrderModel;
import com.ecommerce.model.ShipmentModel;
import com.ecommerce.model.response.OrderItemsModel;
import com.ecommerce.model.response.OrderRefModel;
import com.ecommerce.service.implementation.OrderImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping(path = "/order")
public class OrderController {

    @Autowired
    private OrderImpl orderImpl;

    @GetMapping
    public List<OrderRefModel> getOrderFromCustomer(@RequestParam(required = false) UUID customerId) {
        return orderImpl.getOrdersForCustomer(customerId);
    }

    @GetMapping(path = "/{orderId}")
    public List<OrderItemsModel> getProductsInOrder(@PathVariable UUID orderId) {
        return orderImpl.getOrderItems(orderId);
    }

    @PostMapping(consumes = "application/json")
    public String addNewOrder(@RequestBody ShipmentModel shipment) {
        return orderImpl.createNewOrder(shipment);
    }

    @PutMapping(path = "/{orderId}", consumes = "application/json")
    public OrderModel updateOrderItem(@RequestBody OrderModel order) {
        orderImpl.updateOrderItem(order.getOrderId(), order.getProductId(), order.getStatus());
        return order;
    }

    @DeleteMapping(path = "/{orderId}/{productId}")
    public String deleteProductInOrder(
            @PathVariable UUID orderId,
            @PathVariable UUID productId
    ) {
        orderImpl.deleteProductInOrder(orderId, productId);
        return "deleted";
    }

}
