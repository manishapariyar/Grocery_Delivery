
import { useEffect, useState } from 'react'
import { useStoreContext } from '../../context/StoreContext'
import SellerNavbar from './SellerNavbar';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, isSellerLogin, setIsSellerLogin } = useStoreContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSellerLogin) {
      if (email && password) {
        setIsSeller(true);
        navigate("/seller/dashboard");
      } else {
        alert("Please enter valid email and password");
      }
    } else {
      if (email && password) {
        setIsSeller(true);
        navigate("/seller/dashboard");
      } else {
        alert("Please enter valid email and password");
      }
    }

  }
  return !isSeller && (
    <>
      <SellerNavbar />
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">
          {isSellerLogin ? <><span className="text-green-400">Seller</span> Login</> : <><span className="text-green-400">Seller</span> Register</>}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border border-gray-300 rounded w-full max-w-xs"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
          required
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isSellerLogin ? 'Login' : 'Register'}
        </button>

        <p className="mt-4 text-sm text-gray-600">
          {isSellerLogin ? (
            <>Don't have an account?{' '}
              <span className="text-blue-500 cursor-pointer" onClick={() => setIsSellerLogin(false)}>Register</span>
            </>
          ) : (
            <>Already have an account?{' '}
              <span className="text-blue-500 cursor-pointer" onClick={() => setIsSellerLogin(true)}>Login</span>
            </>
          )}
        </p>
      </form></>
  );
}

export default SellerLogin