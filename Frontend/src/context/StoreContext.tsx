import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import { Product } from "../components/ProductCard";


export interface StoreContextType {
  navigate: ReturnType<typeof useNavigate>;
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  currency: string;
  products: Product[];
  cartItems: Record<string, number>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  addToCart: (itemId: string) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  getCartCount: () => number;
  getCartAmount: () => number;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<Record<Product['_id'], number>>({});
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");



  // fetch All Products
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  }
  useEffect(() => {
    fetchProducts();
  }, [])


  // add product to card
  const addToCart = (itemId: string | number) => {
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to Cart")
  }

  //update card items Quantity
  const updateCartItem = (itemId: string | number, quantity: number) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated")
  }

  // remove items from card

  const removeFromCart = (itemId: string | number) => {
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] == 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success("Deleted items from Cart")
  }

  // count cart items
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  // total amount of cart 

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  }

  const value = { navigate, user, setUser, setIsSeller, isSeller, showLogin, setShowLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, setCartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount };




  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreContextProvider");
  }
  return context;
};
