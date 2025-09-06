import { assets } from '../assets/assets';
import { useStoreContext } from '../context/StoreContext';

export interface Product {
  size: string;
  description: any;
  _id: any;
  id: string;
  name: string;
  price: number;
  weight?: string;
  quantity?: number;
  offerPrice: number;
  category: string;
  images: string[];
  stock: boolean;
}

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useStoreContext();

  return product && (
    <div
      onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0); }}
      className="border border-gray-300 rounded-md bg-white transition hover:shadow-md cursor-pointer px-2 py-2 sm:px-3 sm:py-3 min-w-[120px] max-w-[160px] sm:min-w-[140px] sm:max-w-[180px] w-full"
    >
      {/* Image */}
      <div className="group flex items-center justify-center px-1 sm:px-2">
        <img
          className="group-hover:scale-105 transition max-w-[90px] sm:max-w-[110px] md:max-w-36"
          src={product.images?.[0] || " "}
          alt={product.name}
        />
      </div>

      {/* Product Info */}
      <div className="text-gray-500/70 text-xs sm:text-sm mt-1">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-sm sm:text-base truncate w-full">{product.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-0.5 mt-1">
          {Array(5).fill('').map((_, i) => (
            <img
              key={i}
              className='w-3 sm:w-3.5'
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt=""
            />
          ))}
          <p className='text-xs sm:text-sm ml-1'>4</p>
        </div>

        {/* Price & Cart */}
        <div className="flex items-end justify-between mt-2 sm:mt-3">
          <p className="text-green-700 font-medium text-sm sm:text-base">
            {currency}{product.offerPrice}{" "}
            <span className="text-gray-500/60 line-through text-xs sm:text-sm">{currency}{product.price}</span>
          </p>

          <div onClick={(e) => e.stopPropagation()} className="text-green-500">
            {!cartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-green-100 border border-green-300 text-green-600 font-medium text-xs sm:text-sm px-2 sm:px-3 py-1 rounded"
                onClick={() => addToCart(product._id)}
              >
                <img src={assets.cart_icon} alt="cart_icon" className="w-3 sm:w-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 bg-green-500/25 rounded px-1 sm:px-2 py-1 select-none">
                <button onClick={() => removeFromCart(product._id)} className="px-1 text-sm sm:text-base">-</button>
                <span className="w-4 text-center text-sm sm:text-base">{cartItems[product._id]}</span>
                <button onClick={() => addToCart(product._id)} className="px-1 text-sm sm:text-base">+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
