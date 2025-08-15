import Order from '../models/order.js';
import Product from '../models/product.js';
//place order COD
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    // Validate input
    if (!userId || items.length === 0 | !address || !paymentMethod) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    //calcuate total amount using items
    let totalAmount = items.reduce(async (total, item) => {
      const product = await Product.findById(item.product);
      return (await total) + (product.offerprice * item.quantity)
    }, 0);


    //add tax and shipping cost
    totalAmount += Math.floor(totalAmount * 0.2);

    await Order.create({
      userId,
      items,
      totalAmount,
      address,
      paymentMethod: 'Cash on Delivery',
      isPaid: false
    });

    res.status(201).json({ message: 'Order placed successfully', order: Order });
  }
  catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}


//order details form individual user

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const orders = await Order.find({
      userId,
      $or: [{ paymentMethod: "COD" }, { ispaid: true }]
    }).populate('items.product').populate('address').sort({ orderDate: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

//GEt all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentMethod: "COD" }, { ispaid: true }]
    }).populate('items.product').populate('address').sort({ orderDate: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


//