import React, { useState } from 'react'
import MainBanner from '../components/MainBanner'
import CategoryMenu from '../components/CategoryMenu'
import { categories } from '../assets/assets';
import BestSeller from '../components/BestSeller';



const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div>
      <CategoryMenu
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <MainBanner />

      <BestSeller />
    </div>
  )
}

export default Home