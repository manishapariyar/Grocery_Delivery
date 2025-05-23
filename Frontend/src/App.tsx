

import React, { useState } from "react";
import CategoryMenu from "./components/CategoryMenu"

import Nabvar from "./components/Nabvar"
import { categories } from "./assets/assets"
import ImageSlider from "./components/ImageSlider";
import LoginPopUp from "./pages/LoginPopUp";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false)


  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="">
        <Nabvar setShowLogin={setShowLogin} />
        <CategoryMenu
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ImageSlider />
      </div>


    </>
  )
}

export default App
