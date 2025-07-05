
import Nabvar from "./components/Nabvar"
import LoginPopUp from "./components/LoginPopUp";
import Footer from "./components/Footer";
import { useStoreContext } from "./context/StoreContext";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrder from "./pages/MyOrder";
import SellerLoginPopUp from "./components/seller/SellerLoginPopUp";
import SellerHomePage from "./components/seller/SellerHomePage";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import Orders from "./pages/seller/Orders";
import ProductList from "./pages/seller/ProductList";

function App() {

  const { showLogin, isSellerLogin, isSeller } = useStoreContext();

  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <>
      <div className="text-default min-h-screen text-gray-700 bg-white ">
        {showLogin && <LoginPopUp />}
        {isSellerLogin && <SellerLoginPopUp />}
        {isSellerPath ? null : <Nabvar />}
        <Toaster />

        <div className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/products/:category' element={<ProductCategory />} />
            <Route path='/products/:category/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/add-address' element={<AddAddress />} />
            <Route path='/orders' element={<MyOrder />} />

            <Route path='/seller/dashboard' element={isSeller ? <SellerLayout /> : <SellerHomePage />} >
              <Route path='add-product' element={isSeller ? <AddProduct /> : null} />
              <Route path='order-list' element={<Orders />} />
              <Route path='product-list' element={<ProductList />} />
            </Route>

          </Routes>
        </div>
        {!isSellerPath && <Footer />}
      </div>


    </>
  )
}

export default App
