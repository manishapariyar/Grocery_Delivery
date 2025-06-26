import React from 'react'
import { assets } from '../../assets/assets'
import { useStoreContext } from '../../context/StoreContext';

const SellerNavbar = () => {
  const { isSellerLogin, setIsSellerLogin, navigate } = useStoreContext();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <a href="/">
        <img className="h-9" src={assets.sellerLogo} alt="Seller Logo" />
      </a>

      {isSellerLogin ? (
        <button
          onClick={() => {
            setIsSellerLogin(false);
            navigate("/seller");
          }}
          className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => setIsSellerLogin(true)}
          className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default SellerNavbar;
