
import { useState } from "react";
import "./CheckoutSection.css";

function CheckoutSection({ cartItems, onBack, onPlaceOrder }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleSubmit(event) {
    event.preventDefault();
    onPlaceOrder();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <section className="checkout-section">
        <div className="order-success">
          <h1>Thank You for Shopping!</h1>
          <p>Your order has been placed successfully.</p>
          <p>Thank you for choosing LUXE.</p>
          <button onClick={onBack}>Continue Shopping</button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <button className="checkout-back" onClick={onBack}>
        ← Back to Cart
      </button>

      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="empty-checkout">
          <p>Your cart is empty. Add products before checkout.</p>
          <button onClick={onBack}>Continue Shopping</button>
        </div>
      ) : (
        <div className="checkout-container">

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Delivery Information</h2>

            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />

            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />

            <label>Delivery Address</label>
            <textarea
              placeholder="Enter your complete address"
              rows="4"
              required
            />

            <label>City</label>
            <input type="text" placeholder="Enter your city" required />

            <label>PIN Code</label>
            <input
              type="text"
              placeholder="Enter 6-digit PIN code"
              pattern="[0-9]{6}"
              maxLength="6"
              required
            />

            <button type="submit" className="place-order-button">
              PLACE ORDER
            </button>
          </form>

          <div className="order-summary">
            <h2>Order Summary</h2>

            {cartItems.map((item) => (
              <div
                className="summary-item"
                key={`${item.id}-${item.size || "default"}`}
              >
                <div>
                  <h3>{item.name}</h3>
                  {item.size && <p>Size: {item.size}</p>}
                  <p>Quantity: {item.quantity}</p>
                </div>

                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}

            <div className="summary-total">
              <span>Total Amount</span>
              <strong>₹{total}</strong>
            </div>

            <p className="payment-note">
              Payment method: Cash on Delivery (Demo)
            </p>
          </div>

        </div>
      )}
    </section>
  );
}

export default CheckoutSection;
