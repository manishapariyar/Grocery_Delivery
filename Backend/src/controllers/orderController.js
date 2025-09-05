import Order from '../models/order.js';
import Product from '../models/Product.js';
import { getEsewaPaymentHash, verifyEsewaPayment } from '../config/esewa.js';

// Place Order (COD or eSewa)
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, paymentMethod } = req.body;

    // Validate input  
    if (!userId || !items || items.length === 0 || !address || !paymentMethod) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      const price = Number(product.offerPrice) || 0;
      const qty = Number(item.quantity) || 0;
      totalAmount += price * qty;
    }

    // Calculate tax (20%) and total amount for eSewa
    const tax = Math.floor(totalAmount * 0.2);
    const tAmt = totalAmount + tax;

    // Create order
    const newOrder = await Order.create({
      userId,
      items: items.map(item => ({
        product: item.productId,
        quantity: item.quantity
      })),
      totalAmount,
      address,
      paymentMethod,
      isPaid: false // initially false for both
    });

    // If eSewa payment, send necessary details to frontend
    if (paymentMethod === 'esewa') {
      const esewaHash = await getEsewaPaymentHash(tAmt); // pass total including tax
      return res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        order: newOrder,
        esewaData: {
          amt: totalAmount,
          txAmt: tax,
          tAmt: tAmt,
          pid: newOrder._id,
          scd: "YOUR_MERCHANT_CODE",
          su: `http://localhost:5173/esewa/success`,
          fu: `http://localhost:5173/esewa/fail`,
          hash: esewaHash
        }
      });
    }

    // COD response
    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Complete eSewa Payment
export const completeEsewaPayment = async (req, res) => {
  const { amt, txAmt, tAmt, pid, scd, refId } = req.query;

  try {
    // Verify payment with eSewa
    const paymentInfo = await verifyEsewaPayment({ amt, txAmt, tAmt, pid, scd, refId });

    // Find order by pid
    const order = await Order.findById(pid).populate('items.product');
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.isPaid = true;
    order.paymentMethod = "esewa";
    order.status = "pending"; // can update status as needed
    await order.save();

    res.json({ success: true, message: "Payment verified successfully", order });
  } catch (error) {
    console.error("Error completing eSewa payment:", error);
    res.status(500).json({ success: false, message: "Payment verification failed", error: error.message });
  }
};

// Get orders for individual user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const orders = await Order.find({
      userId,
      $or: [
        { paymentMethod: "COD" },
        { isPaid: true },
        { paymentMethod: "esewa", isPaid: false }
      ]
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

// Get all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentMethod: "COD" }, { isPaid: true }]
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
