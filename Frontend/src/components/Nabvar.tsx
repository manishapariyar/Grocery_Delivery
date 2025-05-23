import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FiSearch } from "react-icons/fi";
import { IoPersonCircleOutline, IoCartOutline } from "react-icons/io5";
import { BsShop } from 'react-icons/bs';
interface Navbar {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<Navbar> = ({ setShowLogin }) => {
  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* Mobile Layout */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 gap-2">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={assets.logo} alt="logo" className="w-28" />
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 mx-2 md:hidden">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md text-black focus:outline-none bg-green-100"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <Link to="/login" className="p-2">
            <button onClick={() => setShowLogin(true)} className="p-2">
              <IoPersonCircleOutline className="text-xl" />
            </button>

          </Link>
          <Link to="/cart" className="p-2">
            <IoCartOutline className="text-xl" />
          </Link>
          <Link to="/become_seller" className="p-2">
            <BsShop className="text-xl" />
          </Link>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-[100%] h-[80px] px-10 py-2 items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-45" />
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 mx-10 lg:block sm:hidden">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for products"
            className="w-full pl-10 pr-4 py-2 rounded-md text-black focus:outline-none bg-green-100"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button onClick={() => setShowLogin(true)} className="hover:bg-green-300 rounded-sm px-4 py-2 flex items-center">

            <IoPersonCircleOutline className="mr-1 text-xl" />
            Login
          </button>
          <Link to="/cart" className="hover:bg-green-300 rounded-sm px-4 py-2 flex items-center">
            <IoCartOutline className="mr-1 text-xl" /> Cart
          </Link>
          <Link to="/become_seller" className="hover:bg-yellow-50 rounded-sm px-4 py-2 flex items-center">
            <BsShop className="mr-1 text-xl" /> Become a Seller
          </Link>
        </div>


      </div>
    </div>
  );
};

export default Navbar;
