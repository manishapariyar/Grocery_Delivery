import { useEffect, useState } from 'react';
import { useStoreContext } from '../context/StoreContext';
import { dummyOrders } from '../assets/assets';
import { FaMoneyBillWave, FaShoppingBag, FaHashtag } from 'react-icons/fa';

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState<typeof dummyOrders>([]);
  const { currency, axios, user } = useStoreContext();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user')
      if (data.success) {
        setMyOrders(data.orders)

      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }

  }, [user]);

  return (
    <div className="flex flex-col p-6 md:p-10 gap-8 w-full min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-700 border-b-4 border-green-500 w-max">
        My Orders
      </h2>

      {myOrders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl bg-white shadow-lg hover:shadow-xl transition duration-300 p-6 space-y-6"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                <FaHashtag className="text-green-500" />
                <span>
                  <span className="font-semibold">Order ID:</span> {order._id}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                <FaMoneyBillWave className="text-green-500" />
                <span>
                  <span className="font-semibold">Payment:</span> {order.paymentType}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm md:text-base font-semibold">
                <FaShoppingBag className="text-green-400" />
                <span className="text-gray-700">
                  Total: {currency}.{order.amount}
                </span>
              </div>
            </div>

            {/* Products Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-3 text-gray-600 font-semibold text-sm border-t border-b  py-2 border-green-300">
              <div className="col-span-4">Product</div>
              <div className="col-span-3 text-center">Details</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-3 text-right">Amount</div>
            </div>
            {/* Products Table Body */}
            <div className="flex flex-col divide-y ">
              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-gray-50 border border-gray-300  p-4 flex flex-col gap-2 md:grid md:grid-cols-12 md:gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-3 md:col-span-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded border border-green-500"
                    />
                    <div className="flex flex-col">
                      <p className="text-gray-800 font-medium">{item.product.name}</p>
                      <p className="text-gray-500 text-sm">{item.product.category}</p>
                    </div>
                  </div>

                  {/* Quantity and Date */}
                  <div className="flex flex-col md:flex-col md:items-center md:justify-center text-sm text-gray-600 md:col-span-3">
                    <span className="block md:hidden text-green-500 font-semibold mb-1 ">Details:</span>
                    <p>Qty: {item.quantity}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Status */}
                  <div className="text-sm text-gray-600 md:flex md:items-center md:justify-center md:col-span-2 flex gap-2">
                    <span className="block md:hidden text-green-500  font-semibold mb-1">Status:</span>
                    <p> {order.status}</p>
                  </div>

                  {/* Amount */}
                  <div className="text-sm text-gray-800 font-semibold md:flex md:items-center md:justify-end md:col-span-3 flex gap-2">
                    <span className="block md:hidden text-green-500  font-semibold mr-1">Amount:</span>
                    <p>
                      {currency}.{item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default MyOrder;
