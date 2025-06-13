import { useState } from 'react'
import { useStoreContext } from "../context/StoreContext"
const AllProducts = () => {
  const { products, searchQuery, setSearchQuery } = useStoreContext()
  const [filterProduct, setFilterProduct] = useState([]);
  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl text-gray-500 font-bold  border-b-2 border-green-600 uppercase'>All Products</p>
        <div>
          {products.map((product, index) => (

          ))}
        </div>

      </div>



    </div>
  )
}

export default AllProducts