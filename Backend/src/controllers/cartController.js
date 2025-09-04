import User from '../models/User.js';

export const updateCart = async (req, res) => {
  try {
    const userId = req.user?.id; // or req.body.userId if no auth middleware
    const { cartItems } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Accept object instead of array
    if (!cartItems || typeof cartItems !== "object") {
      return res.status(400).json({ success: false, message: "Invalid cart data" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems }, // directly store object
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Cart updated successfully", cartItems: updatedUser.cartItems });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
