import Order from '../models/order.js';
import Product from '../models/product.js';


export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address, paymentMethod } = req.body;

    // Validate input
    if (!userId || !items || items.length === 0 || !address || !paymentMethod) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Calculate total amount properly
    let totalAmount = 0;
    for (const item of items) {
      // Use productId instead of product
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      totalAmount += Number(product.offerprice) * item.quantity;
    }

    totalAmount += Math.floor(totalAmount * 0.2);


    const newOrder = await Order.create({
      userId,
      items: items.map(item => ({
        product: item.productId,   // 👈 schema expects `product`
        quantity: item.quantity
      })),
      totalAmount,
      address,
      paymentMethod, // should be "COD" in frontend
      isPaid: false
    });

    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



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