import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const recipeDoc = doc(db, 'recipes', id);
        const recipeSnapshot = await getDoc(recipeDoc);

        if (recipeSnapshot.exists()) {
          setRecipeDetails({ id, ...recipeSnapshot.data() });
        } else {
          console.error('Recipe not found');
        }
      } catch (error) {
        console.error('Error fetching recipe details', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{recipeDetails.title}</h2>
      <p>Ingredients: {recipeDetails.ingredients.join(', ')}</p>
      <p>Instructions: {recipeDetails.instructions}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RecipeDetails;