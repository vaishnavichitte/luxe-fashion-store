
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

function LoginSignup({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const user = { name: name || email.split("@")[0], email };

    onLogin(user);
    navigate("/profile");
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="auth-label">WELCOME TO LUXE</p>
        <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p className="auth-description">
          {isLogin
            ? "Sign in to continue your style journey."
            : "Join LUXE and discover your style."}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />

          <button type="submit">
            {isLogin ? "LOGIN" : "SIGN UP"}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
}

export default LoginSignup;
