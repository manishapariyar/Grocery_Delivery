
import Nabvar from "./components/Nabvar"
import LoginPopUp from "./components/LoginPopUp";
import Footer from "./components/Footer";
import { useStoreContext } from "./context/StoreContext";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {

  const { showLogin } = useStoreContext();

  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <>
      <div className="">
        {isSellerPath ? null : <Nabvar />}
        <div className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          <Routes>
            <Route path='/' element={<Home />} />

          </Routes>
        </div>
        <Footer />
      </div>


    </>
  )
}

export default App
