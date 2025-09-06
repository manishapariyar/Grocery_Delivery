
import ProductCard, { Product } from './ProductCard'
import { useStoreContext } from '../context/StoreContext'


export interface StoreContextType {
  products: Product[];
}
const BestSeller = () => {
  const { products } = useStoreContext();
  return (
    <div className='mt-4 px-2 sm:px-4 md:px-6'>
      <p className='text-xl md:text-2xl font-medium text-gray-600 mb-2 sm:mb-4'>
        Best Sellers
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-6'>
        {products
          .filter((product) => product.stock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div> //1080 × 2340
  );
};

export default BestSeller