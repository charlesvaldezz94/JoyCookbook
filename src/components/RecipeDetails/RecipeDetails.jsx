import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        // Increment the likes count
        const newLikesCount = recipeDetails.likes + 1;

        // Update the likes count in Firestore
        await updateDoc(doc(db, "recipes", id), { likes: newLikesCount });

        // Update the local state to reflect the change
        setRecipeDetails((prevDetails) => ({
          ...prevDetails,
          likes: newLikesCount,
        }));

        // Update liked status in local storage
        localStorage.setItem(`liked_${id}`, "true");

        // Set liked status to true
        setIsLiked(true);
      } else {
        // If already liked, decrement the likes count
        const newLikesCount = recipeDetails.likes - 1;

        // Update the likes count in Firestore
        await updateDoc(doc(db, "recipes", id), { likes: newLikesCount });

        // Update the local state to reflect the change
        setRecipeDetails((prevDetails) => ({
          ...prevDetails,
          likes: newLikesCount,
        }));

        // Update liked status in local storage
        localStorage.setItem(`liked_${id}`, "false");

        // Set liked status to false
        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error updating likes", error);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const recipeDoc = doc(db, "recipes", id);
        const recipeSnapshot = await getDoc(recipeDoc);

        if (recipeSnapshot.exists()) {
          setRecipeDetails({ id, ...recipeSnapshot.data() });

          // Check local storage for liked status
          const isAlreadyLiked = localStorage.getItem(`liked_${id}`);
          setIsLiked(isAlreadyLiked === "true");
        } else {
          console.error("Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipe details", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="RecipeDetailsContainer">
      <div className="RecipeDetailsBox">
        <div className="RecipeDetailsTitle">
          <span>
            <h2>{recipeDetails.title}</h2> ({recipeDetails.category})
          </span>
        </div>
        <div className="RecipeDetailsInfoContainer">
          <div className="RecipeDetailsInfoLeft">
            <img src={recipeDetails.imageURL} />
          </div>

          <div className="RecipeDetailsInfoRight">
            <p className="info">
              <span className="infoTitle">Difficulty: </span>
              {recipeDetails.difficultyLevel}
            </p>
            <p className="info">
              <span className="infoTitle">Cooking Time:</span>
              {recipeDetails.cookingTime}
            </p>

            <div className="infoTier2">
              <p className="info">
                <span className="infoTitle">Ingredients:</span>
                {recipeDetails.ingredients.join(", ")}
              </p>
              <p className="info">
                <span className="infoTitle">Instructions:</span>
                {recipeDetails.instructions.join(", ")}
              </p>
            </div>

            <p className="RecipeDetailsLikes">
              {isLiked ? (
                <img
                  src="/images/filledHeart.png"
                  alt="Filled Heart"
                  onClick={handleLikeClick}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <img
                  src="/images/emptyHeart.png"
                  alt="Empty Heart"
                  onClick={handleLikeClick}
                  style={{ cursor: "pointer" }}
                />
              )}
              {recipeDetails.likes}
            </p>
            <div className="RecipeDetailsTags">
              <span className="infoTitle">Tags: </span> {recipeDetails.tags}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
