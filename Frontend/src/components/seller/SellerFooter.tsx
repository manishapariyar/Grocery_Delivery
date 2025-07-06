import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { assets } from "../../assets/assets";


const SellerFooter = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 px-8 py-10 mt-18">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-15">
        {/* Logo and tagline */}
        <div>
          <img src={assets.sellerLogo} alt="" width={140} />
          <p className="mt-2 text-l">Your trusted online grocery delivery partner.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#seller" className="hover:text-white">Sellers</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@groshaaa.com</p>
          <p className="text-sm">Phone: +977-9800000000</p>
          <p className="text-sm">Address: Kathmandu, Nepal</p>
        </div>

        {/* Social media */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2 text-lg">
            <a href="#"><FaFacebookF className="hover:text-white" /></a>
            <a href="#"><FaInstagram className="hover:text-white" /></a>
            <a href="#"><FaTwitter className="hover:text-white" /></a>
            <a href="#"><FaEnvelope className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Groshaaa. All rights reserved.
      </div>
    </footer>
  );
};

export default SellerFooter