import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import "./OrdersPage.css";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function loadProducts() {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    }
    loadProducts();
  }, []);

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}
