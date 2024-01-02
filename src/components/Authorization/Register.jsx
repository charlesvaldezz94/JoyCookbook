import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
