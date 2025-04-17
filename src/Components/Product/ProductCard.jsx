import { Heart, IndianRupee } from "lucide-react";
import React from "react";
import { useTheme } from "../../Context/ThemeProvider";

const ProductCard = ({ image, name, discount, OrgPrice, price, onClick }) => {
  const { darkMode } = useTheme();
  return (
    <>
      <div className="w-full cursor-pointer hover:scale-110 duration-300 p-2">
        <div
          className={`md:w-54 gap-1.5 w-full rounded-xl p-2 flex sm:flex-col shadow-md md:h-72 h-36 ${
            darkMode ? "bg-white" : "bg-gray-700 border text-white"
          }`}
        >
          {/* image box */}
          <div className="w-full relative">
            <img
              onClick={onClick}
              className="w-full object-contain bg-white h-32 border-1 border-green-600 rounded-md"
              src={image}
              alt={name}
            />
            {/* discounts box */}
            <span
              className={`absolute animate-bounce opacity-75 text-white font-sans text-[13px] leading-3 rounded-br-2xl rounded-tl-md  top-1 left-1 p-1 ${
                discount < 50 ? "bg-cyan-600" : "bg-green-500"
              } `}
            >
              {discount}% <br />
              <h6 className="capitalize text-[12px]">off</h6>
            </span>
          </div>
          {/* details box */}
          <div className=" w-full h-full px-2.5 flex flex-col bg bg--400 border-1 rounded-md border-green-700">
            <h1 className="capitalize font-serif text-xl ">{name}</h1>
            <select
              className="w-full border-1 cursor-pointer mb-1 border-green-700 rounded-md font-light"
              id=""
            >
              <option value="">250G</option>
              <option value="">500G</option>
              <option value="">1KG</option>
            </select>
            <div className="flex">
              <span className="capitalize font-sans flex items-center font-bold text-xl">
                <IndianRupee size={16} strokeWidth={1.5} />
                {price}
              </span>
              <span className="pl-1 line-through flex items-center text-[12px]">
                <IndianRupee size={12} strokeWidth={1.5} />
                {OrgPrice}
              </span>
            </div>
            <div className="w-full flex gap-1 mt-1 h-full">
              <div className="h-7 w-7 active:scale-80 duration-300 p-1 flex justify-center items-center rounded-md bg-green-400">
                <Heart />
              </div>
              <span
                // onClick={handleAddToCart()}
                className="w-full h-7 cursor-pointer capitalize font-serif text-white flex justify-center items-center active:scale-95 duration-300 bg-cyan-700 rounded-md"
              >
                add to cart
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
