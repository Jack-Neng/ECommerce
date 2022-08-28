package com.ecommerce.service.implementation;

import com.ecommerce.model.ShipmentModel;
import com.ecommerce.model.response.OrderItemsModel;
import com.ecommerce.model.response.OrderRefModel;
import com.ecommerce.repository.CartRepositoryJdbc;
import com.ecommerce.repository.OrderRepositoryJdbc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class OrderImpl {

    @Autowired
    private OrderRepositoryJdbc orderRepository;

    @Autowired
    private CartRepositoryJdbc cartRepository;

    public List<Integer> getAllOrders() {
        return null;
    }

    public String getOrderUuidByCustomerId(UUID customerUuid) {
        return orderRepository.getOrderUuidByCustomer(customerUuid.toString());
    }

    public List<OrderRefModel> getOrdersForCustomer(UUID customerUuid) {
        List<OrderRefModel> orders = orderRepository.getOrdersByCustomer(customerUuid.toString());
        List<OrderItemsModel> items = orderRepository.getOrderItemsByCustomer(customerUuid.toString());
        for (OrderRefModel order : orders) {
            ShipmentModel shipmentModel = orderRepository.getShipment(order.getOrderRef());
            List<OrderItemsModel> orderItems = items.stream().filter(item -> item.getOrderRef() == order.getOrderRef()).collect(Collectors.toList());
            order.setItems(orderItems);
            order.setShipment(shipmentModel);
        }
        return orders;
    }

    public List<OrderItemsModel> getOrderItems(UUID orderUuid) {
        List<OrderItemsModel> orderItems = orderRepository.getOrderItemsByOrderId(orderUuid.toString());
        return orderItems;
    }

    public String createNewOrder(ShipmentModel shipment) {
        String uuid = UUID.randomUUID().toString();
        String shipmentUuid = UUID.randomUUID().toString();
        orderRepository.assignNewShipment(shipmentUuid, shipment);
        orderRepository.assignNewOrder(uuid, shipmentUuid, shipment.getCustomerId().toString(), shipment.getEmail(), shipment.getTotalPrice());
        orderRepository.insertOrderItem(uuid, shipment.getCartId().toString());
        cartRepository.deleteProductsInCartByCartId(shipment.getCartId().toString());
        return uuid;
    }

    public void updateOrderItem(UUID orderUuid, UUID productId, String status) {
        orderRepository.updateOrderItem(orderUuid.toString(), productId.toString(), status);
    }

    public void deleteProductInOrder(UUID orderUuid, UUID productId) {
        orderRepository.cancelProductInOrderByProductId(orderUuid.toString(), productId.toString(), "C");
    }

}
