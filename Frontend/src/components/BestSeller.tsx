import React from 'react'
import ProductCard from './ProductCard'

const BestSeller = () => {

  return (
    <div className='mt-4'>
      <p className='text-xl md:text-2xl font-medium text-gray-600'>Best Sellers</p>
      <ProductCard />
    </div>
  )
}

export default BestSeller