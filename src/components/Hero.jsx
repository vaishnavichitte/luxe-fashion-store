
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p>NEW COLLECTION 2026</p>

        <h1>Style That Speaks.</h1>

        <h2>Discover Your Elegance</h2>

        <Link to="/shop" className="hero-button">
          SHOP NOW
        </Link>
      </div>
    </section>
  );
}

export default Hero;
