

import React, { useState } from "react";
import CategoryMenu from "./components/CategoryMenu"

import Nabvar from "./components/Nabvar"
import { categories } from "./assets/assets"
import ImageSlider from "./components/ImageSlider";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");


  return (
    <>
      <div className="">
        <Nabvar />
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
