import React from 'react'
import { useStoreContext } from '../context/StoreContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {

  const { products } = useStoreContext();
  const { category } = useParams();
  const searchCategory = categories.find((item) =>
    item.path.toLowerCase() === category
  )
  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase() === category)

  return (
    <div className='my-10 mx-4'>
      {searchCategory && (
        <div className='flex flex-col items-end w-max'>
          <p className='text-xl font-medium'>{searchCategory.text.toUpperCase(
          )}</p>
          <div className="w-16 h-0.5 bg-green-300 rounded-full"></div>

        </div>
      )}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6  lg:grid-cols-5 m-6'>

          {filteredProducts.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className='text-xl font-medium text-green-400'>No products found in this category <span className='text-3xl'>🥱</span>.</p>
        </div>
      )}
    </div>
  )
}

export default ProductCategory