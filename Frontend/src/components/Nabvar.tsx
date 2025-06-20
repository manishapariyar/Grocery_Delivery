import React, { useContext, useEffect, useState } from 'react';
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
  const [open, setOpen] = useState(true);
  const { user, setUser, setShowLogin, navigate, setSearchQuery, searchQuery, getCartCount } = useStoreContext();

  const logout = async () => {
    setUser(false);
    navigate('/');
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products")
    }

  }, [setSearchQuery])

  return (
    <div className="w-full sticky top-0 z-50 bg-white shadow-md">
      {/* Mobile Layout */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 gap-2">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0" onClick={() => setOpen(false)}>
          <img src={assets.logo} alt="logo" className="w-28" />
        </NavLink>

        {/* Search Bar */}
        <div className="relative w-full">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md text-black focus:outline-none bg-green-100"
          />
        </div>

        {/* Cart Icon */}
        <div onClick={() => navigate("/cart")}
          className="relative cursor-pointer">
          <IoCartOutline className="mr-1 text-4xl text-green-500 opacity-80" />
          <button className='absolute -top-1 -right-1 text-xs bg-red-300 w-[18px] h-[18px] rounded-full text-white'>{getCartCount()}</button>
        </div>
        {user && (
          <div className='relative group'>
            <img src={assets.profile_icon} alt="" width={70} />
            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40  '>
              <li className='p-1 pl-8   hover:bg-gray-300  cursor-pointer'>
                <NavLink to="/orders">My Order</NavLink>
              </li>
              <li className='p-1 pl-3 hover:bg-gray-300 cursor-pointer'>
                <button
                  onClick={logout}
                  className="hover:bg-gray-300 rounded-sm px-4 flex items-center"
                >
                  <LuLogOut className="mr-1 text-xl" />
                  Logout
                </button></li>
            </ul>
          </div>
        )}

        {/* Menu Icon */}
        <button onClick={() => setOpen(!open)} className="ml-2 cursor-pointer">
          {open ? (
            <RxCross2 className="text-2xl" />
          ) : (
            <BiMenu className="text-3xl" />
          )}
        </button>


        {/* Mobile Dropdown Menu */}
        <div className={`${open ? 'flex' : 'hidden'} absolute top-full left-0 w-full bg-white pt-4 shadow-md pb-4 flex-col items-start gap-4 px-5 text-sm md:hidden`}>


          <NavLink to="/" className="hover:border-b border-gray-400 text-l font-bold text-gray-600" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" className="hover:border-b border-gray-400 text-l font-bold text-gray-600" onClick={() => setOpen(false)}>All Product</NavLink>

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
            <></>
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
          <NavLink to="/products" className="hover:border-b border-gray-400">All Product</NavLink>
        </div>

        {/* Search */}
        <div className="relative flex-1 mx-10 lg:block sm:hidden">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products"
            className="w-full pl-10 pr-4 py-2 rounded-md text-black focus:outline-none bg-green-100"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {!user ? (
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className="hover:bg-green-300 rounded-sm px-4 py-2 flex items-center"
            >
              <IoPersonCircleOutline className="mr-1 text-xl" />
              Login
            </button>
          ) : (
            <div className='relative group'>
              <img src={assets.profile_icon} alt="" width={40} />
              <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40  '>
                <li className='p-1 pl-8   hover:bg-gray-300  cursor-pointer'>
                  <NavLink to="/orders">My Order</NavLink>
                </li>
                <li className='p-1 pl-3 hover:bg-gray-300 cursor-pointer'>
                  <button
                    onClick={logout}
                    className="hover:bg-gray-300 rounded-sm px-4 flex items-center"
                  >
                    <LuLogOut className="mr-1 text-xl" />
                    Logout
                  </button></li>


              </ul>
            </div>
          )}
          <div onClick={() => navigate("/cart")}
            className="relative cursor-pointer">
            <IoCartOutline className="mr-1 text-4xl text-green-500 opacity-80" />
            <button className='absolute -top-1 -right-1 text-xs bg-red-300 w-[18px] h-[18px] rounded-full text-white'>{getCartCount()}</button>
          </div>
          <NavLink to="/become_seller" className="hover:bg-yellow-50 rounded-sm px-4 py-2 flex items-center">
            <BsShop className="mr-1 text-xl text-amber-500" /> Become a Seller
          </NavLink>

        </div>
      </div>
    </div >
  );
};

export default Navbar;
