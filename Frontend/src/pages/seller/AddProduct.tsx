import { useState } from "react";
import { assets, categories } from "../../assets/assets";


const AddProduct = () => {
  const [file, setFile] = useState<(File | undefined)[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);





  const onSubmitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }

  return (
    <div className=" no-scrollbar flex-1 flex-col flex overflow-y-scroll justify-between">
      <form className="md:p-10 p-4 space-y-5 max-w-lg" onSubmit={onSubmitHandler}>
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const selectedFile = [...file];
                  if (e.target.files && e.target.files[0]) {
                    selectedFile[index] = e.target.files[0];
                    setFile(selectedFile);
                  }
                }} type="file" id={`image${index}`} hidden />


                <img src={file[index] ? URL.createObjectURL(file[index]) : assets.upload_area} alt="upload" width={100} height={100} className="max-w-24 cursor-pointer" />

              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input onChange={
            (e) => {
              setName(e.target.value);
            }
          } value={name}
            id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea onChange={
            (e) => {
              setDescription(e.target.value);
            }
          } value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
        </div>
        <div className="flex flex-col gap-1 overflow-visible">
          <label htmlFor="category" className="text-base font-medium">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item.path} value={item.path}>{item.path}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
            <input onChange={
              (e) => {
                setPrice(Number(e.target.value));
              }
            } value={price}
              id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
            <input onChange={
              (e) => {
                setOfferPrice(Number(e.target.value));
              }
            }
              value={offerPrice}
              id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
          </div>
        </div>
        <button className="px-8 py-2.5 bg-green-500 text-white font-medium rounded">ADD</button>
      </form>
    </div>
  );

}

export default AddProduct