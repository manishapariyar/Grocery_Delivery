import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StoreContextType {
  navigate: ReturnType<typeof useNavigate>;
  user: any[] | null;
  setUser: React.Dispatch<React.SetStateAction<any[] | null>>;
  isSeller: null;
  setIsSeller: React.Dispatch<React.SetStateAction<null>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any[] | null>(null);
  const [isSeller, setIsSeller] = useState<null>(null);
  const [itemsList, setItemsList] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [showLogin, setShowLogin] = useState(true);

  const value = { navigate, user, setUser, setIsSeller, isSeller, showLogin, setShowLogin };

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
