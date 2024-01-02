import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, useAuth } from "../../firebase/firebase";

const MyRecipes = () => {
  const { currentUser: authUser } = useAuth();
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        if (authUser) {
          const userEmail = authUser.email;
          const recipesCollection = collection(db, "recipes");
          const querySnapshot = await getDocs(recipesCollection);
          const userRecipesData = [];

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Check if the recipe's author email matches the current user's email
            if (data.author === userEmail) {
              userRecipesData.push({ id: doc.id, ...data });
            }
          });

          setUserRecipes(userRecipesData);
        }
      } catch (error) {
        console.error("Error fetching user recipes", error);
      }
    };

    fetchUserRecipes();
  }, [authUser]); // Include authUser in the dependency array

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await deleteDoc(doc(db, "recipes", recipeId));
      // Update the state after deletion
      setUserRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
      alert("This recipe has been deleted");
    } catch (error) {
      console.error("Error deleting recipe", error);
    }
  };

  return (
    <div>
      <h2>My Recipes</h2>
      <ul>
        {userRecipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.title}
            <button onClick={() => handleDeleteRecipe(recipe.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRecipes;
