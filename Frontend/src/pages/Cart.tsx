import { useEffect, useState } from 'react';
import { useStoreContext } from '../context/StoreContext';
import { CgRemoveR } from 'react-icons/cg';
import { BiArrowBack } from 'react-icons/bi';
import { Product } from '../components/ProductCard';
import toast from 'react-hot-toast';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    setCartItems,
    user,
  } = useStoreContext();

  type Address = {
    street: string;
    city: string;
    state: string;
    country: string;
    [key: string]: any;
  };

  const [selectAddress, setSelectAddress] = useState<Address | null>(null);
  const [cartArray, setCartArray] = useState<Product[]>([]);
  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentOption, setPaymentOption] = useState<'COD' | 'esewa'>('COD');

  // Load cart products from cartItems
  const getCart = () => {
    const tempArr: Product[] = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArr.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArr);
  };

  // Fetch user addresses
  const getUserAddresses = async () => {
    try {
      const response = await axios.get('/api/address/get-address');
      if (response.data.success) {
        setAddresses(response.data.addresses);
        if (response.data.addresses.length > 0) {
          setSelectAddress(response.data.addresses[0]);
        }
      } else {
        toast.error(response.data.message || 'Failed to fetch addresses');
      }
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message ||
        (error as Error)?.message ||
        'Failed to fetch addresses'
      );
    }
  };

  useEffect(() => {
    if (user) getUserAddresses();
  }, [user]);

  // Place order handler
  const placeOrder = async () => {
    try {
      if (!selectAddress) {
        toast.error('Please select a delivery address');
        return;
      }
      if (cartArray.length === 0) {
        toast.error('Your cart is empty');
        return;
      }

      const method = paymentOption; // 'COD' or 'esewa'

      const { data } = await axios.post('/api/order/order-place', {
        userId: user?._id,
        address: selectAddress,
        paymentMethod: method,
        items: cartArray.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
      });

      if (!data.success) {
        toast.error(data.message || 'Failed to place order');
        return;
      }

      if (method === 'COD') {
        toast.success('Order placed successfully');
        setCartItems({});
        navigate('/orders');
      } else if (method === 'esewa') {
        const { order } = data;

        // Backend already included 20% tax in totalAmount
        const amt = order.totalAmount; // product + tax
        const txAmt = 0; // already included in backend
        const psc = 0;
        const pdc = 0;
        const tAmt = amt + txAmt + psc + pdc;

        const pid = order._id;
        const scd = 'EPAYTEST'; // sandbox merchant code
        const su = `http://localhost:5173/esewa/success`;
        const fu = `http://localhost:5173/esewa/fail`;

        // Correct Esewa redirect URL (sandbox)
        const esewaURL = `https://rc-epay.esewa.com.np/epay/main?amt=${amt}&psc=${psc}&pdc=${pdc}&txAmt=${txAmt}&tAmt=${tAmt}&pid=${pid}&scd=${scd}&su=${su}&fu=${fu}`;

        window.location.href = esewaURL;
      }
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message ||
        (error as Error)?.message ||
        'Failed to place order'
      );
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{' '}
          <span className="text-sm text-green-500">{getCartCount()} items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.images[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    weight: <span>{product.weight || 'N/A'}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none ml-1"
                      value={product.quantity}
                      onChange={(e) =>
                        updateCartItem(product._id, parseInt(e.target.value))
                      }
                    >
                      {Array.from(
                        { length: Math.max(10, product.quantity || 1) },
                        (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerPrice * (product.quantity || 1)}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <CgRemoveR className="inline-block w-6 h-6 text-red-400" />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate('/products');
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-green-500 font-medium"
        >
          <BiArrowBack className="text-green-200 group-hover:-translate-x-1 transition" />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectAddress
                ? `${selectAddress.street}, ${selectAddress.city}, ${selectAddress.state}, ${selectAddress.country}`
                : 'No address found'}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-green-500 hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state}, {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate('/add-address')}
                  className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value as 'COD' | 'esewa')}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="esewa">Online Payment via Esewa</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount().toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (20%)</span>
            <span>
              {currency}
              {(getCartAmount() * 0.2).toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {(getCartAmount() * 1.2).toFixed(2)}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          {paymentOption === 'COD' ? 'Place Order' : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
