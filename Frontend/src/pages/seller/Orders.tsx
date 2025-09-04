import React, { ReactNode, useEffect, useState } from "react";
import { useStoreContext } from "../../context/StoreContext";
import { assets, dummyOrders } from "../../assets/assets";
import { FiPackage } from "react-icons/fi"; // simple outline icon
import toast from "react-hot-toast";

type Order = {
  totalAmount: number;
  createdAt: string | number | Date;
  items: { product: { name: string }; quantity: number }[];
  address: {
    phone: number;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  amount: number;
  paymentMethod: string;
  orderDate: string;
  isPaid: boolean;
};

const Orders = () => {
  const { currency, axios } = useStoreContext();
  const [orders, setOrders] = useState<Order[]>([]);
  console.log(orders);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gray-100 flex flex-col">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-xl font-semibold">Orders</h2>

        {orders.map((order, index) => {
          const paidClass = order.isPaid
            ? "bg-green-50 text-green-600"
            : "bg-yellow-50 text-yellow-600";

          return (
            <article
              key={index}
              className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-6"
            >
              {/* Left: Items & icon */}
              <div className="flex gap-4 flex-1 min-w-[220px]">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50">
                  <img className="w-12 h-12 object-cover " src={assets.box_icon} alt="boxIcon" />
                </div>

                <div className="flex flex-col gap-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <p className="font-medium truncate max-w-[160px]">
                        {item.product.name}
                      </p>
                      <span className="text-sm font-semibold text-green-600">
                        × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle: Address */}
              <div className="flex-1 text-sm text-gray-700">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="leading-snug">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.state} {order.address.zipcode},{" "}
                  {order.address.country}
                </p>
                <p className="leading-snug">
                  {order.address.phone}
                </p>
              </div>

              {/* Right‑side meta */}
              <div className="flex flex-col gap-2 sm:text-right">
                <p className="text-lg font-semibold">
                  {currency}
                  {(order.totalAmount ?? 0).toFixed(2)}

                </p>

                <div className="text-sm text-gray-600">
                  <p>
                    Method <span className="font-bold m-1">:</span> {order.paymentMethod} •{" "}
                  </p>
                  <p>
                    Date <span className="font-bold m-1">:</span> {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>


                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${paidClass}`}
                >
                  <p>Payment<span className="font-bold m-1">:</span> {order.isPaid ? "Paid" : "Pending"}</p>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
