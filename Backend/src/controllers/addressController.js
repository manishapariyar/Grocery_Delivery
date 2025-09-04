
//add address

import Address from "../models/Address.js";
export const addAddress = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { address } = req.body; // only the address object from frontend

    const newAddress = await Address.create({ ...address, userId });
    res.status(201).json({ success: true, message: 'Address added successfully', address: newAddress });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




//get all addresses
export const getAllAddresses = async (req, res) => {
  try {
    const userId = req.user?.id; // 👈 comes from JWT
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const addresses = await Address.find({ userId });

    if (!addresses.length) {
      return res.status(404).json({ success: false, message: "No addresses found for this user" });
    }

    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
