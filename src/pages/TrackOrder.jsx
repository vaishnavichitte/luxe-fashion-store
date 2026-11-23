
import { useParams, Link } from "react-router-dom";
import "./TrackOrder.css";

function TrackOrder({ orders }) {
  const { id } = useParams();

  const order = orders.find(
    (item) => String(item.id) === id
  );

  if (!order) {
    return (
      <section className="tracking-page">
        <h1>Order Not Found</h1>
        <p>We couldn't find this order.</p>
        <Link to="/orders">View My Orders</Link>
      </section>
    );
  }

  const steps = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Delivered"
  ];

  const currentStep = steps.indexOf(order.status);

  return (
    <section className="tracking-page">
      <h1>Track Your Order</h1>
      <h3>Order #{order.id}</h3>
      <p>Current Status: {order.status}</p>

      <div className="tracking-steps">
        {steps.map((step, index) => (
          <div
            key={step}
            className={
              index <= currentStep
                ? "tracking-step completed"
                : "tracking-step"
            }
          >
            <span>
              {index <= currentStep ? "✓" : index + 1}
            </span>
            <p>{step}</p>
          </div>
        ))}
      </div>

      <Link to="/orders">Back to My Orders</Link>
    </section>
  );
}

export default TrackOrder;
