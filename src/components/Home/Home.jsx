import React, { useState, useMemo, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, useAuth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const { currentUser: authUser } = useAuth();
  const isAuthenticated = authUser !== null;

  const joy = useMemo(() => {
    if (!authUser) return false;
    const userName = authUser.email.split('@')[0].toLowerCase();
    return userName === "joylovescharles";
  }, [authUser]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(db, "recipes");
        const recipesSnapshot = await getDocs(recipesCollection);
        const recipesData = recipesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedRecipes = recipesData.sort((a, b) => b.likes - a.likes);
        const top3Recipes = sortedRecipes.slice(0, 3);
        setRecipes(top3Recipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  const getDisplayName = (recipe) => {
    const authorEmail = recipe.author || "";
    const displayName = authorEmail ? authorEmail.split("@")[0] : "Unknown";
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  };
  

  return (
    <div id="homeContainer">
      <div className="homeTopContainer">
        <div className="homeTitle">
          <span>
          <img src="/images/medal.png" id="top3img"/>
          <img src="/images/medal.png" id="top3img"/>
          <img src="/images/medal.png" id="top3img"/>
          <p> Top 3 Recipes of the Week </p>
          <img src="/images/medal.png" id="top3img"/>
          <img src="/images/medal.png" id="top3img"/>
          <img src="/images/medal.png" id="top3img"/>
          </span>
        </div>
        <div className="topRecipesCards">
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                {/* Use Link to navigate to RecipeDetails */}
                <Link to={`/recipe/${recipe.id}`} className="topRecipesCard">
                  <h3>{recipe.title}</h3>
                  <img src={recipe.imageURL} alt="Recipe" id="recipeImg" />
                  <div className="cardAuthor">{getDisplayName(recipe)} </div>
                  <span>
                    <img id="likes" src="/images/filledHeart.png" />
                    {recipe.likes}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="homeMiddleContainer">
        <div className="homeMiddleContainerTitle">
          <h2> Create your own recipes here! </h2>
          {isAuthenticated ? (
            <Link to="/create-recipe">
              <button className="btn"> Here </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn"> Here </button>
            </Link>
          )}
        </div>
      </div>

      <div className="homeBottomContainer">
        <div className="homeBottomTitle">
          <h2> Check out your recipes here!</h2>
        </div>
        <div className="homeBottomLink">
          {isAuthenticated ? (
            <Link to="/my-recipes">
              <button className="btn"> Here </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn"> Here </button>
            </Link>
          )}
        </div>
      </div>

      {joy && (
      <div className="valentinesContainer">
        <div className="valHeader"> 
          <h2> Hi JoylovesCharles! Click the button for a special surprise!</h2>
        </div>
        <div className="homeBottomLink">
          <Link to="/valentines">
            <button className="btn"> Here </button>
          </Link>
          </div>

      </div>
    )}


    </div>
  );
};

export default Home;
