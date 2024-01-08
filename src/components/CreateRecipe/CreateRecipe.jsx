import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, useAuth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const { currentUser: authUser } = useAuth();
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [imageURL, setImageURL] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleAddTag = () => {
    if (tag.trim() !== "") {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleAddInstruction = () => {
    if (instruction.trim() !== "") {
      setInstructions([...instructions, instruction.trim()]);
      setInstruction("");
    }
  };

  const handleDeleteTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleDeleteInstruction = (index) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setInstructions(updatedInstructions);
  };

  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "Title is required";
    }

    if (ingredients.length === 0) {
      errors.ingredients = "At least one ingredient is required";
    }

    if (instructions.length === 0) {
      errors.instructions = "At least one instruction is required";
    }

    if (tags.length === 0) {
      errors.tags = "At least one tag is required";
    }

    if (!difficultyLevel.trim()) {
      errors.difficultyLevel = "Difficulty level is required";
    }

    if (!imageURL.trim()) {
      errors.imageURL = "Image URL is required";
    }

    if (!cookingTime.trim()) {
      errors.cookingTime = "Cooking time is required";
    }

    if (category === "Select a category") {
      errors.category = "Category is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateRecipe = async () => {
    // Check if the user is logged in
    if (!authUser) {
      // User is not logged in, show an error message
      alert("You need to log in to create a recipe.");
      return;
    }
  
    if (validateForm()) {
      try {
        const author = authUser.email || "Unknown"; // Use a default value if email is null
        const dateCreated = serverTimestamp();
  
        const newRecipeRef = await addDoc(collection(db, "recipes"), {
          title,
          author,
          dateCreated,
          difficultyLevel,
          imageURL,
          ingredients,
          instructions,
          likes: 0,
          tags,
          cookingTime,
          category,
        });
  
        console.log("Recipe created with ID:", newRecipeRef.id);
  
        navigate(`/recipe/${newRecipeRef.id}`);
      } catch (error) {
        console.error("Error creating recipe", error);
      }
    }
  };

  return (
    <div className="createRecipeContainer">
      <div className="createRecipeTitle">
        <h2>Create Recipe</h2>
      </div>
      <div className="createRecipeFormContainer">
        <form>
          <div className="titleForm">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div className="tagsForm">
            <label>Tags:</label>
            <div>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button type="button" onClick={handleAddTag}>
                Add Tag
              </button>
            </div>
            {errors.tags && <p className="error">{errors.tags}</p>}
            <ul>
              {tags.map((item, index) => (
                <li key={index}>
                  {item}
                  <button type="button" onClick={() => handleDeleteTag(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="ingredientsForm">
            <label>Ingredients:</label>
            <div>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              />
              <button type="button" onClick={handleAddIngredient}>
                Add Ingredient
              </button>
            </div>
            {errors.ingredients && (
              <p className="error">{errors.ingredients}</p>
            )}
            <ul>
              {ingredients.map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    type="button"
                    onClick={() => handleDeleteIngredient(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="instructionsForm">
            <label>Instructions:</label>
            <div>
              <input
                type="text"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
              <button type="button" onClick={handleAddInstruction}>
                Add Instruction
              </button>
            </div>
            {errors.instructions && (
              <p className="error">{errors.instructions}</p>
            )}
            <ul>
              {instructions.map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    type="button"
                    onClick={() => handleDeleteInstruction(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="difficultyLevelForm">
            <label>Difficulty Level:</label>
            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
              <option value="advanced">Advanced</option>
            </select>
            {errors.difficultyLevel && (
              <p className="error">{errors.difficultyLevel}</p>
            )}
          </div>

          <div className="imageURLForm">
            <label>Image URL:</label>
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            {errors.imageURL && <p className="error">{errors.imageURL}</p>}
          </div>

          <div className="cookingTimeForm">
            <label>Cooking Time:</label>
            <input
              type="text"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
            />
            <span> E.G: 10 min </span>
            {errors.cookingTime && (
              <p className="error">{errors.cookingTime}</p>
            )}
          </div>

          <div className="categoryForm">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select a category" disabled>
                Select a category
              </option>
              <option value="Italian">Italian</option>
              <option value="Italian">Filipino</option>
              <option value="French">French</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="Spanish">Spanish</option>
              <option value="Thai">Thai</option>
              <option value="Greek">Greek</option>
              <option value="Turkish">Turkish</option>
              <option value="Brazilian">Brazilian</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Korean">Korean</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Mediterranean">Mediterranean</option>
              <option value="American">American</option>
              <option value="Peruvian">Peruvian</option>
              <option value="Argentinian">Argentinian</option>
              <option value="Caribbean">Caribbean</option>
              <option value="Middle Eastern">Middle Eastern</option>
              <option value="African">African</option>
              <option value="Russian">Russian</option>
              <option value="Swiss">Swiss</option>
              <option value="British">British</option>
              <option value="Irish">Irish</option>
              <option value="Scandinavian">Scandinavian</option>
              <option value="Portuguese">Portuguese</option>
              <option value="German">German</option>
              <option value="Dutch">Dutch</option>
            </select>
            {errors.category && <p className="error">{errors.category}</p>}
          </div>

          <button type="button" onClick={handleCreateRecipe}>
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
