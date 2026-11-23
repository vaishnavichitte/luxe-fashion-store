

import "./CartSection.css";

function CartSection({
  cartItems,
  onRemove,
  onQuantityChange,
  onCheckout
}) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="cart-section">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size || "default"}`}
              className="cart-item"
            >
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>

              {item.size && <p>Size: {item.size}</p>}

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    onQuantityChange(item.id, item.size, -1)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    onQuantityChange(item.id, item.size, 1)
                  }
                >
                  +
                </button>
              </div>

              <p>Subtotal: ₹{item.price * item.quantity}</p>

              <button onClick={() => onRemove(item.id, item.size)}>
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button className="checkout-button" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </>
      )}
    </section>
  );
}

export default CartSection;
