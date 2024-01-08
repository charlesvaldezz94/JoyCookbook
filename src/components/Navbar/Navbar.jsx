import React from "react";
import { Link } from "react-router-dom";
import { useAuth, signOut } from "../../firebase/firebase";
import "./Navbar.css";

const Navbar = () => {
  const auth = useAuth();

  const getDisplayName = () => {
    // Extract the user's email and remove the domain part
    const userEmail = auth.currentUser?.email || "";
    const displayName = userEmail.split("@")[0];

    // Capitalize the first letter of the display name
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  };

  return (
    <div id="navbarContainer">
      <nav>
        <div className="navbarHomeLink">
          <Link to="/">Home</Link>
        </div>
        <div className="navbarRecipeLinks">
          <Link to="/all-recipes"> All Recipes </Link>
          <Link to="/create-recipe"> Create-a-Recipe</Link>
          <span className="myRecipeLink">
            {" "}
            {!auth.currentUser ? (
              <></>
            ) : (
              <Link to="/my-recipes"> My Recipes</Link>
            )}
          </span>
        </div>
        <div className="navbarLoginLinks">
          {!auth.currentUser ? (
            <div className="navbarAuth">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <div className="navbarWelcome">
              <span>Welcome, {getDisplayName()}!</span>
              <button onClick={() => signOut(auth)}>Sign Out</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
