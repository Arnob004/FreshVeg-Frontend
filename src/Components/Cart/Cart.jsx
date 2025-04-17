import { Home, Trash2 } from "lucide-react"; // Added Trash2 icon
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";
const Cart = () => {
  const { darkMode } = useTheme();
  const [items, setItems] = useState(() => {
    // Initialize state from localStorage
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const navigate = useNavigate();



  // Persist changes to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const handleQuantityChange = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };

  // New function to delete an product 
  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((product) => product.id !== id));
  };

  const total = items.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div
      className={`w-full h-screen overflow-y-scroll p-4 ${darkMode ? "bg-green-200" : "bg-black"
        } `}
    >
      <div
        className={`w-full h-14 rounded-md flex items-center px-2  ${darkMode ? "bg-white" : "bg-zinc-800 "
          } shadow-md`}
      >
        <Link
          className="text-blue-700 p-2 rounded-full border hover:bg-blue-50 transition-colors"
          to="/"
        >
          <Home size={24} />
        </Link>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ${darkMode ? "bg-gray-100" : "bg-zinc-700 text-white"
          }  rounded-md p-4`}
      >
        <div className="md:col-span-2 overflow-scroll flex flex-col gap-4">
          {items.length === 0 ? (
            <p
              className={`text-center ${darkMode ? "text-black" : "text-white"
                }`}
            >
              Your cart is empty.
            </p>
          ) : (
            items.map((product) => (
              <div
                key={product.id}
                className={`flex justify-between items-center gap-3 ${darkMode ? "bg-white" : " bg-zinc-700 tw"
                  }  border shadow-md rounded-md p-3`}
              >
                <img
                  onClick={() => {
                    navigate(`/product/${product.name}`, { state: { product } })
                  }}
                  className="h-16 w-16 object-cover rounded-md border"
                  src={product.image}
                  alt={product.name}
                />
                <div className="flex-1 flex flex-col">
                  <h1 className="capitalize font-serif text-xl md:text-2xl">
                    {product.name}
                  </h1>
                  <p className="text-sm font-semibold">₹{product.price}</p>
                </div>
                <div className="flex gap-2 relative items-center">
                  <button
                    className="h-8 w-8 bg-pink-400 text-white rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
                    onClick={() => handleQuantityChange(product.id, -1)}
                  >
                    -
                  </button>
                  <input
                    className="border h-8 w-12 text-center rounded-md"
                    type="text"
                    value={product.quantity}
                    readOnly
                  />
                  <button
                    className="h-8 w-8 bg-pink-400 text-white rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"
                    onClick={() => handleQuantityChange(product.id, 1)}
                  >
                    +
                  </button>
                  {/* Delete Button */}
                  <div className="p-4 bg--400">
                    <button
                      className="h-8 w-8  bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      onClick={() => handleDeleteItem(product.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length !== 0 && (
          <>
            <div className="md:col-span-1 flex flex-col gap-4 bg--500 rounded-md p-4 border ">
              <h2 className="text-2xl md:text-3xl font-serif border capitalize text-center bg-white text-black rounded-md p-2">
                Order Details
              </h2>
              <div className="flex-1 flex flex-col gap-2">
                {items.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between text-sm md:text-base"
                  >
                    <span>
                      {product.name} (x{product.quantity})
                    </span>
                    <span>₹{(product.price * product.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full h-14 bg-pink-400 text-white text-xl md:text-2xl font-serif capitalize rounded-md hover:bg-pink-600 transition-colors">
                Order Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
