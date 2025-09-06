import { useEffect, useState } from 'react';
import { useStoreContext } from "../context/StoreContext";
import ProductCard, { Product } from '../components/ProductCard';

const AllProducts = () => {
  const { products, searchQuery } = useStoreContext();
  const [filterProduct, setFilterProduct] = useState<Product[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterProduct(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilterProduct(products);
    }
  }, [products, searchQuery]);

  return (
    <div className='mt-16 px-2 sm:px-4 md:px-6 flex flex-col'>
      <div className='flex flex-col items-start w-full'>
        <p className='text-2xl sm:text-3xl text-gray-500 font-bold border-b-2 border-green-600 uppercase mb-4'>All Products</p>
        {filterProduct.filter(product => product.stock).length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-6'>
            {filterProduct
              .filter(product => product.stock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[50vh] w-full">
            <p className='text-lg sm:text-xl font-medium text-green-400'>No products available <span className='text-2xl'>🥱</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
