import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useStoreContext } from '../context/StoreContext';
import toast from 'react-hot-toast';

// Define address state type
interface Address {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

// Define props for InputField component
interface InputFieldProps {
  type: string;
  placeholder: string;
  name: keyof Address;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  address: Address;
}

// Reusable input field
const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  name,
  handleChange,
  address,
}) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-green-400'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
  />
);

const AddAddress: React.FC = () => {
  const { axios, navigate, user } = useStoreContext();
  const [address, setAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', { address });

      if (data.success) {
        toast.success("Address added successfully");
        navigate('/cart')
      } else {
        toast.error(data.message || "Failed to add address");
      }
    } catch (err) {
      toast.error(
        (err as any)?.response?.data?.message ||
        (err as Error)?.message ||
        "Failed to add address"
      );
    }
  };
  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='text-green-400 font-bold'>Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-8">
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className="grid grid-cols-2 gap-2">
              <InputField
                handleChange={handleChange}
                address={address}
                name='firstName'
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name='lastName'
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name='email'
              type="email"
              placeholder="Email Address"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name='street'
              type="text"
              placeholder="Street"
            />

            <div className='grid grid-cols-2 gap-4'>
              <InputField
                handleChange={handleChange}
                address={address}
                name='city'
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name='state'
                type="text"
                placeholder="State"
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <InputField
                handleChange={handleChange}
                address={address}
                name='zipcode'
                type="number"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name='phone'
                type="text"
                placeholder="Phone Number"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name='country'
              type="text"
              placeholder="Country"
            />

            <button
              type="submit"
              className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Save Address
            </button>
          </form>
        </div>
        <div className="bg-green-300 flex justify-center  items-center rounded-xl align-center p-4 md:mr-16 mb-6 md:mt-0 shadow shadow-green">
          <img
            src={assets.add_address_img}
            alt="Add Address"
            className=' w-[400px] rounded-[60px] p-10 '
          />
        </div>

      </div>
    </div>
  );
};

export default AddAddress;
