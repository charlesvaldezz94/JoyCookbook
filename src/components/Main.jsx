import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Login from "./Authorization/Login";
import Register from "./Authorization/Register";
import AllRecipes from "./AllRecipes/AllRecipes";
import RecipeDetails from "./RecipeDetails/RecipeDetails";
import CreateRecipe from "./CreateRecipe/CreateRecipe";
import MyRecipes from "./MyRecipes/MyRecipes";

const Main = () => {
  return (
    <div className="mainContainer">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />

      </Routes>
    </div>
  );
};

export default Main;
