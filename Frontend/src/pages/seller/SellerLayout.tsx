import React from 'react'
import { useStoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { LuPackagePlus } from 'react-icons/lu';
import { CgPlayListCheck } from 'react-icons/cg';
import { BsBagCheck } from 'react-icons/bs';


const SellerLayout = () => {

  const { setIsSeller } = useStoreContext();


  const sidebarLinks = [
    { name: "Add Product", path: "/seller/dashboard/add-product", icon: <LuPackagePlus className='text-green-500' /> },
    {
      name: "product List", path: "/seller/dashboard/product-list", icon: <CgPlayListCheck className='text-green-500' />
    },
    { name: "Orders", path: "/seller/dashboard/order-list", icon: <BsBagCheck className='text-green-500' /> },
  ];

  const logout = async () => {
    setIsSeller(false);
  }

  return (
    <>
      <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white'>
        <Link to={'/'}>
          <img src={assets.sellerLogo} alt="logo" className='cursor-pointer w-28 ' />
        </Link>
        <div className='flex items-center gap-5 text-gray-500'>
          <p>Hi! Admin</p>
          <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
        </div>
      </div>
      <div className='flex'>
        <div className="md:w-50 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink to={item.path} key={item.name} end={item.path === "/seller"}

              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-4 text-3xl ${isActive
                  ? "border-r-4 md:border-r-[6px] bg-green-500/10 border-green-500 text-green-500"
                  : "hover:bg-gray-100/90 border-white"
                }`
              }
            >
              {item.icon}
              <p className='md:block hidden text-center text-[16px]'>{item.name}</p>

            </NavLink>

          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout