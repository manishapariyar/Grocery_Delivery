import React from "react";
import { useStoreContext } from "../context/StoreContext";

type CategoryType = {
  text: string;
  path: string;
  images: string;
  bgColor: string;
};

type Props = {
  categories: CategoryType[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CategoryMenu: React.FC<Props> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {


  const { navigate } = useStoreContext();
  return (
    <div className="flex flex-col items-center m-2 shadow-md rounded-xl bg-white w-full max-w-7xl mx-auto justify-center">
      <h1 className="text-sm font-semibold text-neutral-400 mt-4">
        Shop by Category
      </h1>
      <div className="flex justify-between overflow-x-auto gap-2 py-2 px-2 w-full scrollbar-hide">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              const newCategory = selectedCategory === item.path ? "All" : item.path;
              setSelectedCategory(newCategory);
            }}
            className="flex flex-col items-center justify-center flex-shrink-0 basis-1/3 sm:basis-auto cursor-pointer"
          >
            <div
              className={`rounded-full transition-all duration-200 p-1 sm:p-[6px] ${selectedCategory === item.path
                ? "ring-4 ring-green-200"
                : ""
                }`}
              style={{ backgroundColor: item.bgColor }}
              onClick={() => {
                navigate(`/products/${item.path.toLowerCase()}`)
                scrollTo(0, 0)
              }}

            >
              <img
                src={item.images}
                alt={item.text}
                className="w-18 h-18 rounded-full object-cover"
              />
            </div>
            <p className="mt-1 text-[12px] font-medium text-gray-500 text-center hidden sm:block">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-t-2 border-gray-200 w-full" />
    </div>
  );
};

export default CategoryMenu;
