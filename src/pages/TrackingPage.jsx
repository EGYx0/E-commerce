import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import { Header } from "../components/Header";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const [order, setOrder] = useState(null);
  const { orderId, productId } = useParams();

  useEffect(() => {
    async function loadTrackingOrder() {
      let response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    loadTrackingOrder();
  }, [orderId]);
  if (!order) {
    return <div>Loading...</div>;
  }
  let filteredProduct = null;
  filteredProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />

      <title>Tracking</title>
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(filteredProduct.estimatedDeliveryTimeMs).format(
              "dddd, MMMM D",
            )}
          </div>
          <div className="product-info">{filteredProduct.product.name}</div>
          <div className="product-info">
            Quantity: {filteredProduct.quantity}
          </div>
          <img className="product-image" src={filteredProduct.product.image} />
          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
