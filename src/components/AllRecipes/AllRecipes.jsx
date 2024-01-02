import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(db, "recipes");
        const recipesSnapshot = await getDocs(recipesCollection);

        const recipesData = recipesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecipes(recipesData);
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
    <div className="allRecipesContainer">
      <div className="allRecipesTitle">
        <h2>All Recipes</h2>
      </div>
      <div className="allRecipesCards">
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              {/* Use Link to navigate to RecipeDetails */}
              <Link to={`/recipe/${recipe.id}`} className="allRecipesCard">
                <h3>{recipe.title}</h3>
                <p> {getDisplayName(recipe)} </p>
                <p>{recipe.ingredients.join(", ")}</p>
                <p>{recipe.instructions}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllRecipes;
