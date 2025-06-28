import { IoIosArrowDown } from 'react-icons/io';
import { assets } from '../../assets/assets';
import { useStoreContext } from '../../context/StoreContext';
import { useState } from 'react';

const SellerNavbar = () => {
  const { isSellerLogin, setIsSellerLogin, navigate } = useStoreContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    "Create Account",
    "List Products",
    "Storage & Shipping",
    "Receive Payments",
    "Grow Faster",
    "Seller App",
    "Help & Support",
  ];

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-gray-300 bg-green-100 shadow-sm">
      {/* Left: Logo + Dropdown */}
      <div className="flex items-center gap-5 relative">
        <a href="/">
          <img className="h-12 object-contain" src={assets.sellerLogo} alt="Seller Logo" />
        </a>

        {/* Dropdown Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {/* Dropdown Toggle */}
          <button className="text-gray-800 font-medium flex items-center gap-1 hover:text-green-700">
            Sell Online
            <span className="ml-1"><IoIosArrowDown /></span>
          </button>

          {/* Dropdown Content */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-50">
              <ul className="py-1">
                {options.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 cursor-pointer"
                    onClick={() => alert(item)} // or navigate(`/your-path/${item}`) etc.
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right: Auth Buttons */}
      {isSellerLogin ? (
        <button
          onClick={() => {
            setIsSellerLogin(false);
            navigate("/seller");
          }}
          className="text-gray-700 hover:text-red-600 font-medium transition"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => setIsSellerLogin(true)}
          className="text-gray-700 hover:text-green-700 font-medium transition"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default SellerNavbar;
