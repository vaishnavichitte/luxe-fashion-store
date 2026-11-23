
import { useState } from "react";
import "./ProductDetails.css";

function ProductDetails({ product, onBack, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["S", "M", "L", "XL"];

  function handleAddToCart() {
    onAddToCart({
      ...product,
      size: selectedSize
    });
  }

  return (
    <section className="product-details">

      <button className="back-button" onClick={onBack}>
        ← Back to Shop
      </button>

      <div className="details-container">

        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <p className="details-category">
            {product.category} COLLECTION
          </p>

          <h1>{product.name}</h1>

          <h2>₹{product.price}</h2>

          <p className="details-description">
            Discover timeless style with this premium fashion
            piece. Designed for comfort, elegance and everyday
            sophistication.
          </p>

          <h3>Select Size</h3>

          <div className="size-options">
            {sizes.map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "selected" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            className="details-cart-button"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </button>

          <p className="delivery-info">
            Free delivery on eligible orders.
          </p>

        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
