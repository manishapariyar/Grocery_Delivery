import React from 'react'
import SellerNavbar from './SellerNavbar'
import { assets } from '../../assets/assets'
import { sellerFeatures } from '../../assets/assets'
import SellerSuccessStory from './SellerSuccessStory'
import { useStoreContext } from '../../context/StoreContext'
import SellerFooter from './SellerFooter'
import AboutGrosha from './AboutGrosha'

const SellerHomePage = () => {
  const { setIsSellerLogin } = useStoreContext();
  return (
    <>

      <div className="bg-white min-h-screen font-sans">
        <SellerNavbar />


        {/* Hero Section */}
        <div
          id='home'
          className="bg-gray-50 py-12 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between"
          style={{
            backgroundImage: `url(${assets.sellerHeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Text Content */}
          <div className="md:w-1/2 mb-8 md:mb-0 bg-opacity-80 p-6 rounded-md">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-600 mb-4 ">
              Sell OnLine with <span className='text-green-600'>Grosha</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Reach customers and grow your business online.
            </p>
            <button className="bg-yellow-300 hover:bg-green-500 text-black px-6 py-2 rounded-md font-medium transition" onClick={() => setIsSellerLogin(true)}>
              Start Selling
            </button>
          </div>
        </div>


        {/* Features Section */}
        <div className="z-10 relative bg-white py-4 px-6 md:px-20">
          <div
            className="lg:w-[80%] w-full m-auto -mt-14 rounded-xl border-b-[2px] border-gray-300 mb-4 py-4 px-2"
            data-aos="zoom-in"
            id="form"
          >
            <div className="grid  lg:grid-cols-5 grid-cols-3 gap-4">
              {sellerFeatures.map(({ icon, text }, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center py-4 border border-transparent rounded-md shadow-sm bg-gray-50 "
                >
                  <div className="text-3xl text-green-600 mb-2">{React.createElement(icon)}</div>
                  <p className="text-gray-700 text-sm font-medium ">{text}</p>
                </div>
              ))}
            </div>
          </div>


        </div>
        <div>
          <AboutGrosha />
        </div>
        {/* Seller Success Section */}
        <div className="px-6 md:px-20 pt-8 mb-10 bg-white">
          <h2 className="text-4xl font-bold text-gray-500 mb-4 text-center"><span className='text-green-500 '>Seller Success</span> Stories</h2>
          <SellerSuccessStory />
        </div>
      </div>
      <SellerFooter /></>
  )
}

export default SellerHomePage