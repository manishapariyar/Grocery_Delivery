import User from '../models/User.js';


//update user cart

export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;


    // Validate input
    if (!userId || !Array.isArray(cartItems)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    const updatedCart = await User.findByIdAndUpdate(userId, { cart: cartItems });
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart updated successfully', cart: updatedCart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}