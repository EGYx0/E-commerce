import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Header } from "../components/Header";
import { formatMoney } from "../utils/money";
import "./OrdersPage.css";
import buyAgain from "../assets/images/icons/buy-again.png";

export function OrdersPage({ cart }) {
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

        <div className="orders-grid">
          {orders &&
            orders.map((order) => {
              return (
                <div key={order.id} className="order-container">
                  <div className="order-header">
                    <div className="order-header-left-section">
                      <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                      </div>
                      <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{formatMoney(order.totalCostCents)}</div>
                      </div>
                    </div>

                    <div className="order-header-right-section">
                      <div className="order-header-label">Order ID:</div>
                      <div>{order.id}</div>
                    </div>
                  </div>
                  <div className="order-details-grid">
                    {order.products.map((item) => {
                      return (
                        <Fragment key={item.id}>
                          <div className="product-image-container">
                            <img src={item.product.image} />
                          </div>

                          <div className="product-details">
                            <div className="product-name">
                              {item.product.name}
                            </div>
                            <div className="product-delivery-date">
                              Arriving on:{" "}
                              {dayjs(item.estimatedDeliveryTimeMs).format(
                                "MMMM D",
                              )}
                            </div>
                            <div className="product-quantity">
                              Quantity: {item.quantity}
                            </div>
                            <button className="buy-again-button button-primary">
                              <img className="buy-again-icon" src={buyAgain} />
                              <span className="buy-again-message">
                                Add to Cart
                              </span>
                            </button>
                          </div>

                          <div className="product-actions">
                            <a href="/tracking">
                              <button className="track-package-button button-secondary">
                                Track package
                              </button>
                            </a>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
