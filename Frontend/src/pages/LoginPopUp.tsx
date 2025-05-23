// src/components/PhoneSignupPopup.tsx
import React, { useState } from 'react';
import { FaWhatsapp, FaFacebookF, FaGoogle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

interface PhoneSignupPopupProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPopUp: React.FC<PhoneSignupPopupProps> = ({ setShowLogin }) => {
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [currentState, setCurrentState] = useState("singup");

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-0 z-10 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-[400px] rounded-lg p-6 relative shadow-md animate-fadeIn">
        <button className="absolute top-4 right-4 text-gray-500" onClick={() => setShowLogin(false)}>
          <IoClose size={20} />
        </button>
        <h2 className="text-xl font-semibold text-center mb-4">{currentState === "signup" ? "Sign Up" : "Login"}</h2>




        {currentState === "login" ? null : (
          <input
            type='name' placeholder='Enter your name' name='name' required className="w-full px-4 py-3 text-sm outline-none border border-gray-300 rounded-md mb-2" />
        )}

        <div className="flex items-start gap-2 text-sm mb-4 flex-col">
          <input type="email" placeholder="Your email" name="email" required className="w-full px-4 py-3 text-sm outline-none  border border-gray-300 rounded-l" />
          <input type="password" placeholder="Password" name="password" required className="w-full px-4 py-3 text-sm outline-none border border-gray-300 rounded-l" />
        </div>
        <button className='bg-green-400 px-4 py-2   rounded-l w-[80%]  text-center mx-10' type='submit'>
          {currentState === "signup" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-start gap-2 text-sm mb-4 mt-2 mx-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mt-1"
          />
          <p>
            By signing up, you agree to our{' '}
            <a href="#" className="text-blue-600 underline">Terms of Use</a> and{' '}
            <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
          </p>
        </div>
        {currentState === "login" ? (
          <p className="text-sm text-center mt-4">
            Create an account?{' '}
            <span onClick={() => setCurrentState("signup")} className="text-blue-600 font-semibold cursor-pointer">Click here</span>
          </p>
        ) : (
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <span onClick={() => setCurrentState("login")} className="text-blue-600 font-semibold cursor-pointer">Log in Now</span>
          </p>
        )}

        {currentState === "signup" ? (
          <>
            <div className="flex items-center gap-2 my-3">
              <hr className="flex-1 border-gray-300" />
              <span className="text-xs text-gray-500">Or, sign up with</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            <div className="flex justify-center gap-6">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 flex gap-2 items-center"><FaGoogle />Google</button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 flex gap-2 items-center"><FaFacebookF />Facebook</button>
            </div></>) : null}
      </div>
    </div>
  );
};

export default LoginPopUp;
