// frontend/src/components/SellerLoginPopUp.tsx
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useStoreContext } from "../../context/StoreContext";
import toast from "react-hot-toast";

const SellerLoginPopUp = () => {
  const { isSellerLogin, setIsSellerLogin, isSeller, setIsSeller, navigate, axios } = useStoreContext();

  const [currentState, setCurrentState] = useState<"login" | "signup">("signup");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shopName: "",
  });
  const [agreed, setAgreed] = useState(false); // terms checkbox

  useEffect(() => {
    if (isSeller) navigate("/seller/dashboard");
  }, [isSeller, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentState === "signup" && !agreed) {
      toast.error("You must agree to the Seller Terms and Privacy Policy.");
      return;
    }

    try {
      const url = currentState === "signup" ? "/api/auth/seller/signup" : "/api/auth/seller/login";
      const payload = currentState === "signup" ? { ...form, agreed } : form;

      const { data } = await axios.post(url, payload);

      if (data.success) {
        setIsSellerLogin(false);
        setIsSeller(true);
        toast.success(data.message);

        // Reset form
        setForm({ name: "", email: "", password: "", phone: "", shopName: "" });
        setAgreed(false);

        navigate("/seller/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (!isSellerLogin) return null;

  return (
    <div
      className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center"
      onClick={() => setIsSellerLogin(false)}
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] max-w-[400px] bg-white rounded-lg p-6 shadow-md animate-fadeIn"
      >
        {/* Close button */}
        <button type="button" onClick={() => setIsSellerLogin(false)} className="relative left-84 hover:text-red-500 text-gray-500">
          <IoClose size={20} />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-xl font-semibold text-center">
          {currentState === "signup" ? "Seller Sign Up" : "Seller Login"}
        </h2>

        {/* Signup extra fields */}
        {currentState === "signup" && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="mb-2 w-full rounded-md border px-4 py-3"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="mb-2 w-full rounded-md border px-4 py-3"
              required
            />
            <input
              type="text"
              name="shopName"
              placeholder="Shop Name"
              value={form.shopName}
              onChange={handleChange}
              className="mb-2 w-full rounded-md border px-4 py-3"
              required
            />
          </>
        )}

        {/* Common fields */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-2 w-full rounded-md border px-4 py-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-2 w-full rounded-md border px-4 py-3"
          required
        />

        {/* Terms & Privacy checkbox */}
        {currentState === "signup" && (
          <label className="mb-4 flex items-start gap-2 text-sm">
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} className="mt-1" />
            <span>
              By signing up you agree to our{' '}
              <a href="#" className="text-blue-600 underline">Seller Terms</a> and{' '}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </span>
          </label>
        )}

        {/* Submit button */}
        <button type="submit" className="w-full rounded bg-green-400 px-4 py-2 font-semibold text-white">
          {currentState === "signup" ? "Create Seller Account" : "Login as Seller"}
        </button>

        {/* Footer switch */}
        <p className="mt-4 text-center text-sm">
          {currentState === "login" ? (
            <>
              New seller?{' '}
              <span onClick={() => setCurrentState("signup")} className="cursor-pointer font-semibold text-blue-600">
                Create an account
              </span>
            </>
          ) : (
            <>
              Already registered?{' '}
              <span onClick={() => setCurrentState("login")} className="cursor-pointer font-semibold text-blue-600">
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
