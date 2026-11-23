
import { Link } from "react-router-dom";
import "./OrdersPage.css";

function OrdersPage({ orders }) {
  return (
    <section className="orders-page">
      <h1>My Orders</h1>
      <p className="orders-subtitle">Your shopping history</p>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No orders yet</h2>
          <p>Your placed orders will appear here.</p>
          <Link to="/shop">Start Shopping</Link>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h3>Order #{order.id}</h3>
            <p>Date: {order.date}</p>
            <p>{order.items.length} product(s)</p>
            <strong>Total: ₹{order.total}</strong>
            <p>Status: {order.status}</p>

            <Link to={`/track-order/${order.id}`}>
              Track Order
            </Link>
          </div>
        ))
      )}
    </section>
  );
}

export default OrdersPage;
