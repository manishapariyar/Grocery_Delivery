// src/components/SellerLoginPopUp.tsx
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useStoreContext } from '../../context/StoreContext';

const SellerLoginPopUp = () => {
  const {
    isSellerLogin, setIsSellerLogin,

    /* existing seller auth helpers */
    isSeller,
    setIsSeller,
    navigate,
  } = useStoreContext();

  // internal UI state
  const [currentState, setCurrentState] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false); // terms checkbox

  /** redirect once authenticated */
  useEffect(() => {
    if (isSeller) navigate('/seller/dashboard');
  }, [isSeller, navigate]);

  /** shared submit handler */
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return alert('Please enter a valid email and password');
    }

    if (currentState === 'signup' && !agreed) {
      return alert('Please accept the Terms & Privacy Policy');
    }

    // later: call your real API here
    setIsSeller(true);
  };

  /* invisible when not needed */
  if (!isSellerLogin) return null;

  return (
    <div                    /* was .absolute .inset-0 ... before */
      className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center"
      onClick={() => setIsSellerLogin(false)}
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={e => e.stopPropagation()}
        className="w-[90%] max-w-[400px] bg-white rounded-lg p-6 shadow-md animate-fadeIn"
      >
        {/* close btn */}
        <button
          type="button"
          onClick={() => setIsSellerLogin(false)}
          className="relative left-84 hover:text-red-500 text-gray-500"
        >
          <IoClose size={20} />
        </button>

        {/* title */}
        <h2 className="mb-4 text-xl font-semibold text-center">
          {currentState === 'signup' ? 'Seller Sign Up' : 'Seller Login'}
        </h2>

        {/* extra field for signup (shop name, optional) */}
        {currentState === 'signup' && (
          <input
            type="text"
            name="storeName"
            placeholder="Store / Brand name"
            className="mb-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none"
            required
          />
        )}

        {/* email + password */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none"
          required
        />

        {/* terms checkbox only on signup */}
        {currentState === 'signup' && (
          <label className="mb-4 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mt-1"
            />
            <span>
              By signing up you agree to our{' '}
              <a href="#" className="text-blue-600 underline">Seller Terms</a> and{' '}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </span>
          </label>
        )}

        {/* submit */}
        <button
          type="submit"
          className="w-full rounded bg-green-400 px-4 py-2 font-semibold text-white"
        >
          {currentState === 'signup' ? 'Create Seller Account' : 'Login as Seller'}
        </button>

        {/* footer switcher */}
        <p className="mt-4 text-center text-sm">
          {currentState === 'login' ? (
            <>
              New seller?{' '}
              <span
                onClick={() => setCurrentState('signup')}
                className="cursor-pointer font-semibold text-blue-600"
              >
                Create an account
              </span>
            </>
          ) : (
            <>
              Already registered?{' '}
              <span
                onClick={() => setCurrentState('login')}
                className="cursor-pointer font-semibold text-blue-600"
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default SellerLoginPopUp;
