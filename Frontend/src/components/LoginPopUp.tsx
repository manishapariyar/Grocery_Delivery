import { useState } from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useStoreContext } from '../context/StoreContext';
import toast from 'react-hot-toast';

const LoginPopUp = () => {
  const { setShowLogin, axios, setUser } = useStoreContext();
  const [agreed, setAgreed] = useState(false);
  const [currentState, setCurrentState] = useState<'login' | 'signup'>("signup");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (currentState === 'signup') {
        if (!agreed) {
          alert('Please agree to the Terms of Use and Privacy Policy');
          return;
        }
        const response = await axios.post('/api/auth/user/signup', formData);
        console.log('Signup success:', response.data);
        setUser(response.data.user);
        setShowLogin(false);
      } else {
        const response = await axios.post('/api/auth/user/login', {
          email: formData.email,
          password: formData.password
        });
        toast.success('Login success:');

        setShowLogin(false);

        setUser(response.data.user);

      }
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);

    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 bg-black/60 z-10 mt-2 flex justify-center items-center"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] max-w-[400px] rounded-lg p-6 relative shadow-md animate-fadeIn"
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500" onClick={() => setShowLogin(false)} type="button">
          <IoClose size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-4">
          {currentState === "signup" ? "Sign Up" : "Login"}
        </h2>

        {/* Signup: Name input */}
        {currentState === "signup" && (
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-sm outline-none border border-gray-300 rounded-md mb-2"
          />
        )}

        {/* Email & Password */}
        <input
          type="email"
          placeholder="Your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 text-sm outline-none border border-gray-300 rounded-md mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 text-sm outline-none border border-gray-300 rounded-md mb-4"
        />

        {/* Signup: Checkbox */}
        {currentState === "signup" && (
          <div className="flex items-start gap-2 text-sm mb-4">
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
        )}

        {/* Submit Button */}
        <button
          className="bg-green-400 px-4 py-2 rounded w-full text-white font-semibold"
          type="submit"
        >
          {currentState === "signup" ? "Create Account" : "Login"}
        </button>

        {/* Toggle Login/Signup */}
        <p className="text-sm text-center mt-4">
          {currentState === "login" ? (
            <>
              Create an account?{' '}
              <span
                onClick={() => setCurrentState("signup")}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setCurrentState("login")}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Log in Now
              </span>
            </>
          )}
        </p>

        {/* Social Options */}
        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-xs text-gray-500">
            {currentState === "signup" ? "Or, sign up with" : "Or, login with"}
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <div className="flex justify-center gap-6">
          <button type="button" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center gap-1">
            <FaGoogle /> Google
          </button>
          <button type="button" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center gap-1">
            <FaFacebookF /> Facebook
          </button>
        </div>

      </form>
    </div>
  );
};

export default LoginPopUp;


