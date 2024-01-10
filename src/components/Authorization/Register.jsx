import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(); // Get the auth object from Firebase

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Create a new user using Firebase Auth API
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // After successful registration, you can access userCredential.user if needed
      console.log("User registered:", userCredential.user);

      // After successful registration, navigate to the desired page
      navigate("/"); // You can adjust the destination URL

      // Clear the form by resetting the state
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="loginTitle">
          <h2>Register</h2>
        </div>

        <div className="loginForm">
          <form onSubmit={handleRegister}>
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

            <button className="loginBtn" type="submit">Register</button>
          </form>
        </div>
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
