import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";

interface StoreContextType {
  navigate: ReturnType<typeof useNavigate>;
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [product, setProduct] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [showLogin, setShowLogin] = useState(true);

  const fetchProducts = async () => {
    setProduct(dummyProducts);
  }
  useEffect(() => {
    fetchProducts();
  }, [])
  const value = { navigate, user, setUser, setIsSeller, isSeller, showLogin, setShowLogin, product, currency };

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
