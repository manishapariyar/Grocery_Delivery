import { useEffect, useState } from 'react'
import { useStoreContext } from "../context/StoreContext"
import ProductCard, { Product } from '../components/ProductCard';
const AllProducts = () => {
  const { products, searchQuery } = useStoreContext()
  const [filterProduct, setFilterProduct] = useState<Product[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterProduct(products.filter(
        product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    } else {
      setFilterProduct(products)
    }
  }, [products, searchQuery])
  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-start w-max'>
        <p className='text-2xl text-gray-500 font-bold  border-b-2 border-green-600 uppercase'>All Products</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6  lg:grid-cols-5 m-6'>
          {filterProduct
            .filter(product => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>

      </div>



    </div>
  )
}

export default AllProducts