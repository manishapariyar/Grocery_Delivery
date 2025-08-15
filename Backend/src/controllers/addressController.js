
//add address

import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;


    await Address.create({ ...address, userId });
    res.status(201).json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


//get all addresses
export const getAllAddresses = async (req, res) => {
  try {
    const { userId } = req.body;

    const addresses = await Address.find({ userId });
    if (!addresses.length) {
      return res.status(404).json({ message: 'No addresses found for this user' });
    }

    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}