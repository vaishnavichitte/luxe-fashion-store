
import { useState } from "react";
import products from "../Data/products";
import "./ProductSection.css";

function ProductSection({
  onAddToCart,
  wishlist,
  onWishlist,
  onViewDetails
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="products-section">
      <div className="section-heading">
        <p>CURATED FOR YOU</p>
        <h2>Featured Collection</h2>
        <span>Explore our latest fashion arrivals</span>
      </div>

      <div className="product-filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-buttons">
          {["All", "Men", "Women"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <button onClick={() => onAddToCart(product)}>
                Add to Cart
              </button>

              <button
                className="wishlist-button"
                onClick={() => onWishlist(product)}
              >
                {wishlist.some((item) => item.id === product.id)
                  ? "♥ Remove from Wishlist"
                  : "♡ Add to Wishlist"}
              </button>

              <button
                className="details-button"
                onClick={() => onViewDetails(product)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="no-products">
            No products found. Try another search.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductSection;

