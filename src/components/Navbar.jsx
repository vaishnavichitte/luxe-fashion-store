
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount }) {
  return (
    <nav>
      <Link to="/" className="logo-link">
        <h1>LUXE</h1>
      </Link>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      <div className="nav-actions">
        <Link to="/login" className="login-link">Login</Link>
        <Link to="/cart" className="nav-cart">
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
