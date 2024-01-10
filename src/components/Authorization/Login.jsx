import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../firebase/firebase";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      await signIn(email, password);

      // Clear the form by resetting the state
      setEmail("");
      setPassword("");

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="loginTitle">
          <h2>Login</h2>
        </div>

        <div className="loginForm">
          <form onSubmit={handleLogin}>
            <div className="formContainer">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="formContainer">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="loginBtn" type="submit">
              Login
            </button>
          </form>
        </div>

        <div className="loginAlt">
          <span>
            <p>
              If you are not yet registered,
              <Link to="/register"> Register Here! </Link>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
