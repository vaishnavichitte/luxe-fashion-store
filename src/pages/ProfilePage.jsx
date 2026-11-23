
import { Link } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage({ user, onLogout }) {
  return (
    <section className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <p className="profile-label">MY ACCOUNT</p>
        <h1>{user?.name || "Guest User"}</h1>
        <p className="profile-email">
          {user?.email || "No email available"}
        </p>

        <div className="profile-links">
          <Link to="/orders">My Orders</Link>
          <Link to="/wishlist">My Wishlist</Link>
          <Link to="/cart">My Shopping Cart</Link>
        </div>

        <button className="logout-button" onClick={onLogout}>
          LOG OUT
        </button>
      </div>
    </section>
  );
}

export default ProfilePage;
