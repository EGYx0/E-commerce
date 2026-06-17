import { OrderHeader } from "./OrderHeader";
import { OrderDetails } from "./OrderDetails";

export function OrdersGrid({ orders, loadCart }) {
  return (
    <div className="orders-grid">
      {orders &&
        orders.map((order) => {
          return (
            <div key={order.id} className="order-container">
              <OrderHeader order={order} />
              <OrderDetails order={order} loadCart={loadCart} />
            </div>
          );
        })}
    </div>
  );
}
