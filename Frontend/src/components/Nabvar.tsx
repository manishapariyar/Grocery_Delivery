import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FiSearch } from "react-icons/fi";
import { IoPersonCircleOutline, IoCartOutline } from "react-icons/io5";
import { BsShop } from 'react-icons/bs';
import { useStoreContext } from '../context/StoreContext';
import { LuLogOut } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { BiMenu } from 'react-icons/bi';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, showLogin, setShowLogin, navigate } = useStoreContext();

  const logout = async () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* Mobile Layout */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 gap-2">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <img src={assets.logo} alt="logo" className="w-28" />
        </NavLink>

        {/* Search Bar */}
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md text-black focus:outline-none bg-green-100"
          />
        </div>

        {/* Cart Icon */}
        <div className="px-2">
          <NavLink to="/cart" className="hover:bg-green-300 rounded-sm px-4 py-2 flex items-center">
            <IoCartOutline className="mr-1 text-xl" /> Cart
          </NavLink>
        </div>

        {/* Menu Icon */}
        <button onClick={() => setOpen(!open)} className="ml-2">
          {open ? (
            <RxCross2 className="text-xl" />
          ) : (
            <BiMenu className="text-2xl" />
          )}
        </button>


        {/* Mobile Dropdown Menu */}
        <div className={`${open ? 'flex' : 'hidden'} absolute top-full left-0 w-full bg-white pt-4 shadow-md pb-4 flex-col items-start gap-4 px-5 text-sm md:hidden`}>


          <NavLink to="/" className="hover:border-b border-gray-400 text-l font-bold text-gray-600" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/product" className="hover:border-b border-gray-400 text-l font-bold text-gray-600" onClick={() => setOpen(false)}>All Product</NavLink>
          {user && (
            <NavLink to="/orders" className="hover:border-b border-gray-400" onClick={() => setOpen(false)}>My Order</NavLink>
          )}
          {!user ? (
            <button
              onClick={() => {
                setShowLogin(true);
                setOpen(false);
              }}
              className="bg-green-300 rounded-sm px-4 py-2 flex items-center gap-1"

            >
              <IoPersonCircleOutline className="text-xl  text-green-500" /> Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="bg-green-200 rounded-sm px-4 py-2 flex items-center gap-2"
            >
              <LuLogOut className="text-xl text-green-700" /> Logout
            </button>
          )}
          <NavLink to="/become_seller" className="bg-yellow-100 rounded-sm px-4 py-2 flex items-center gap-2 " onClick={() => setOpen(false)}>
            <BsShop className="text-xl text-amber-400" /> Become a Seller
          </NavLink>
        </div>

      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-[100%] h-[80px] px-10 py-2 items-center justify-between">
        {/* Logo */}

        <NavLink to="/">
          <img src={assets.logo} alt="logo" className="w-45" />
        </NavLink>

        {/* Nav Links */}
        <div className="flex justify-center pl-70 gap-8">
          <NavLink to="/" className="hover:border-b border-gray-400">Home</NavLink>
          <NavLink to="/product" className="hover:border-b border-gray-400">All Product</NavLink>
        </div>

        {/* Search */}
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
          {user && (
            <NavLink to="/orders" className="hover:border-b border-gray-400">My Order</NavLink>
          )}
          {!user ? (
            <NavLink to="/login">
              <button
                onClick={() => {
                  setShowLogin(true);
                }}
                className="hover:bg-green-300 rounded-sm px-4 py-2 flex items-center"
              >
                <IoPersonCircleOutline className="mr-1 text-xl" />
                Login
              </button>
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="hover:bg-green-300 rounded-sm px-4 py-2 flex items-center"
            >
              <LuLogOut className="mr-1 text-xl" />
              Logout
            </button>
          )}
          <NavLink to="/cart" className="hover:bg-green-300 rounded-sm px-4 py-2 flex items-center">
            <IoCartOutline className="mr-1 text-xl" /> Cart
          </NavLink>
          <NavLink to="/become_seller" className="hover:bg-yellow-50 rounded-sm px-4 py-2 flex items-center">
            <BsShop className="mr-1 text-xl" /> Become a Seller
          </NavLink>

        </div>
      </div>
    </div >
  );
};

export default Navbar;
