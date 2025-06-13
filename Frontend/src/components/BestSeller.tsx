import React from 'react'
import ProductCard, { Product } from './ProductCard'
import { useStoreContext } from '../context/StoreContext'


export interface StoreContextType {
  products: Product[];
}
const BestSeller = () => {
  const { products } = useStoreContext();
  return (
    <div className='mt-4'>
      <p className='text-xl md:text-2xl font-medium text-gray-600'>Best Sellers</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6  lg:grid-cols-5 m-6'>
        {
          products.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        }
      </div>

    </div>
  )
}

export default BestSeller