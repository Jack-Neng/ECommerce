import React, { useEffect, useState } from "react";
import Order from "./Order";
import { getOrders } from "../Util/Requests";
import "./OrderHistory.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const customerId = localStorage.getItem("CUSTOMER_ID");

  const getOrdersByCustomer = async (customerId) => {
    const data = await getOrders(customerId);
    setOrders(data.sort((a, b) => (b.createDate > a.createDate ? 1 : -1)));
  };

  useEffect(() => {
    getOrdersByCustomer(customerId);
  }, []);

  return (
    <div className="OrderHistory  m-auto">
      {orders.map((order, i) => (
        <Order order={order} key={`order-${i}`} />
      ))}
    </div>
  );
}
