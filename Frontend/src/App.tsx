

import React, { useState } from "react";
import CategoryMenu from "./components/CategoryMenu"

import Nabvar from "./components/Nabvar"
import { categories } from "./assets/assets"
import ImageSlider from "./components/ImageSlider";
import LoginPopUp from "./pages/LoginPopUp";
import Footer from "./components/Footer";
import { useStoreContext } from "./context/StoreContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { showLogin } = useStoreContext();


  return (
    <>
      {showLogin && <LoginPopUp />}
      <div className="">
        <Nabvar />
        <CategoryMenu
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <ImageSlider />
        <Footer />
      </div>


    </>
  )
}

export default App
