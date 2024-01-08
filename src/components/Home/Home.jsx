import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, useAuth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const { currentUser: authUser } = useAuth();
  const isAuthenticated = authUser !== null;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(db, "recipes");
        const recipesSnapshot = await getDocs(recipesCollection);

        const recipesData = recipesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort recipes by likes in descending order
        const sortedRecipes = recipesData.sort((a, b) => b.likes - a.likes);

        // Take the top 3 recipes
        const top3Recipes = sortedRecipes.slice(0, 3);

        setRecipes(top3Recipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  const getDisplayName = (recipe) => {
    // Extract the author's email from the recipe
    const authorEmail = recipe.author || "";

    // If email exists, extract the display name
    const displayName = authorEmail ? authorEmail.split("@")[0] : "Unknown";

    // Capitalize the first letter of the display name
    return displayName.charAt(0).toUpperCase() + displayName.slice(1);
  };


  return (
    <div id="homeContainer">


      <div className="homeTopContainer">
        <div className="homeTitle">
          <h2> Top 3 Recipes of the Week </h2>
        </div>
        <div className="topRecipesCards">
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                {/* Use Link to navigate to RecipeDetails */}
                <Link to={`/recipe/${recipe.id}`} className="topRecipesCard">
                  <h3>{recipe.title}</h3>
                  <p> {getDisplayName(recipe)} </p>
                  <img src={recipe.imageURL} alt="Recipe" />
                  <p>
                    {recipe.likes}
                    <img id="likes" src="/images/filledHeart.png" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>


      <div className="homeMiddleContainer">
        <div className="homeMiddleContainerTitle">
          <h2> Create your own recipes here! </h2>
          <Link to="/create-recipe">
            <img src="https://d3awvtnmmsvyot.cloudfront.net/api/file/6QGh7bTRTeciGupN92MQ/convert?fit=max&w=1450&quality=60&cache=true&rotate=exif&compress=true" />
          </Link>
        </div>
      </div>


      <div className="homeBottomContainer">
        <div className="homeBottomTitle">
          <h2> Check out your recipes here!</h2>
          {isAuthenticated ? (
            <Link to="/my-recipes">
              <img
                src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe_writing_700-94d33d1.jpg?quality=90&resize=556,505"
                alt="Check out your recipes"
              />
            </Link>
          ) : (
            <Link to="/login">
              <img
                src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe_writing_700-94d33d1.jpg?quality=90&resize=556,505"
                alt="Check out your recipes"
              />
            </Link>
          )}
        </div>


      </div>
    </div>
  );
};

export default Home;
