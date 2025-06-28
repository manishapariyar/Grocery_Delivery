
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BsShop } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className="bg-gray-600 mt-2 w-full">
      <div className='flex flex-col md:flex-row justify-between px-6 md:px-10 py-8 gap-6 md:gap-0'>
        {/* Logo & Paragraph */}
        <div className="flex flex-col items-start gap-3 md:max-w-[30%]">
          <p className='text-gray-300 text-sm'>
            "Get fresh groceries delivered to your doorstep with ease using our smart grocery delivery app. Shop anytime, enjoy fast delivery, and experience hassle-free convenience from home."
          </p>
        </div>

        {/* About */}
        <div className="flex flex-col">
          <h4 className='text-sm text-gray-800 font-bold mb-2'>ABOUT</h4>
          <div className="flex flex-col text-[13px] font-medium text-gray-100 gap-1">
            <a href="#about">About us</a>
            <a href="#contact">Contact us</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>

        {/* Get in Touch & Social */}
        <div className="flex flex-col">
          <h4 className='text-sm text-gray-800 font-bold mb-2'>GET IN TOUCH</h4>
          <div className="text-[13px] text-gray-100 font-medium">
            <p><span className="font-semibold">Phone No:</span> 9811801198</p>
            <p><span className="font-semibold">Mail Us:</span> groshaOfficial@gmail.com</p>
          </div>
          <div className="border border-gray-400 my-3" />
          <h4 className='text-sm text-gray-800 font-bold mb-2'>SOCIAL</h4>
          <div className="flex gap-4 text-white text-xl">
            <FaFacebook />
            <FaInstagram />
            <FaYoutube />
            <FaTwitter />
          </div>
        </div>
      </div>

      <div className='border-t border-gray-400 mx-6'></div>

      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-2">
        <Link to="/seller" className="flex items-center gap-2">
          <BsShop className="text-xl text-yellow-300" />
          <span className="text-sm text-gray-100 font-semibold">Become a Seller</span>
        </Link>
        <p className="text-xs text-gray-300 text-center">
          &copy; 2025 <span className="font-semibold">Grosha</span> — All rights reserved.
        </p>
        <p className="text-sm text-gray-100 font-semibold">A Grocery Delivery Web..</p>
      </div>
    </div>
  )
}

export default Footer
