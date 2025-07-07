
import { assets } from '../../assets/assets';
import { useStoreContext } from '../../context/StoreContext';


const SellerNavbar = () => {
  const { setIsSellerLogin } = useStoreContext();





  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-gray-300 bg-green-100 shadow-sm">
      {/* Left: Logo + Dropdown */}
      <div className="flex items-center gap-5 relative">
        <a href="/">
          <img className="h-16 object-contain" src={assets.sellerLogo} alt="Seller Logo" />
        </a>

      </div>

      {/* Right: Auth Buttons */}

      <button
        onClick={() => setIsSellerLogin(true)}
        className="text-gray-700 hover:text-green-700 font-medium transition"
      >
        Login
      </button>

    </div>
  );
};

export default SellerNavbar;
