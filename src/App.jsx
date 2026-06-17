import { Routes, Route } from "react-router";
import axios from "axios";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { ErrorPage } from "./pages/ErrorPage";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  async function loadCart() {
    try {
      const response = await axios.get("/api/cart-items?expand=product");
      const data = response.data;
      setCart(data);
    } catch (error) {
      console.log("Failed to fetch cart Items", error);
    }
  }
  useEffect(() => {
    loadCart();
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route
          path="tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />
        <Route path="*" element={<ErrorPage cart={cart} />} />
      </Routes>
    </>
  );
}

export default App;
