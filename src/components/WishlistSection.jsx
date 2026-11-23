import "./WishlistSection.css";
function WishlistSection({ wishlist, onAddToCart }) {
  return (
    <section className="wishlist-section">
      <h2>My Wishlist ♥</h2>

      {wishlist.length === 0 ? (
        <p>No favourite products yet.</p>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-card">
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <button onClick={() => onAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default WishlistSection;