import { ChevronDown, CirclePlus, Home } from "lucide-react";
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // প্রোডাক্ট ডেটা আনছে
  const [showAddressOption, setshowAddressOption] = useState(false)
  return (
    <div className="w-full p-2 bg-green-200 h-screen">
      <div className="w-full flex items-center capitalize relative px-5 text-2xl font-serif mb-2 shadow-sm rounded-md h-12 bg-white">
        order
        <div className="p-1.5 rounded-full border absolute right-2">
          <Link to={-1}>
            <Home />
          </Link>
        </div>
      </div>
      <div className="w-full shadow-md p-2 bg-white rounded-md h-full">
        {product ? (
          <>
            <div onClick={() => setshowAddressOption((prev) => !prev)} className="w-full relative px-4 text-white capitalize font-serif  flex mb-2 items-center p-2 bg-cyan-400 rounded-md py-3">
              select address
              <div
                className="absolute cursor-pointer border-2 flex justify-center items-center rounded-full right-3 ">
                <ChevronDown />
              </div>
            </div>
            {
              showAddressOption && (
                <div className="w-full duration-300 transition mb-2 flex items-center py-3 capitalize font-serif gap-1 px-3 bg-lime-400 mt-1 rounded-md p-2">
                  <CirclePlus /> address
                </div>
              )
            }
            <div className="w-full flex gap-1.5 bg-pink-500 h-32 p-2 rounded-md">
              <img onClick={() => {
                navigate(`/product/${product.name}`, { state: { product } })
              }} className="h-full rounded-md" src={product.image} alt="" />
              <div className="w-full bg-white rounded-md p-1">
                <h1 className="capitalize text-xl font-serif">{product.name}</h1>
                <h1 className="capitalize text-xl font-serif">{product.description}</h1>
              </div>
            </div>
          </>

        ) : (
          <p className="text-red-500">No product data found.</p>
        )}
      </div>
    </div>
  );
};
export default Order;
