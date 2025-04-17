import { Home, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";
const Wishlist = () => {
  const { darkMode } = useTheme();
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div
      className={`w-full min-h-screen ${darkMode ? "bg-green-200" : "bg-zinc-900 text-white"
        } px-4 sm:px-6 lg:px-8 py-6`}
    >
      {/* Header */}
      <div
        className={`w-full h-14 rounded-lg flex items-center px-4 ${darkMode ? "bg-white" : "bg-zinc-800"
          } mb-6 shadow-sm`}
      >
        <Link
          className="text-pink-600 border p-2 rounded-full hover:bg-pink-50 transition-colors"
          to="/"
        >
          <Home size={20} />
        </Link>
        <h1
          className={`ml-4 font-semibold tracking-tight ${darkMode ? "text-gray-800" : "text-gray-200"
            } text-lg sm:text-xl lg:text-2xl`}
        >
          Your Wishlist
        </h1>
      </div>
      {/* Wishlist Grid */}
      <div
        className="grid 
          grid-cols-2 gap-3 
          sm:grid-cols-3 sm:gap-4 
          md:grid-cols-4 md:gap-5 
          lg:grid-cols-5 lg:gap-6 
          xl:grid-cols-6 xl:gap-6"
      >
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div
              key={product.id}
              className={`${darkMode ? "bg-white" : "bg-zinc-800"
                } rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300`}
            >
              <div
                className="cursor-pointer"
              >
                <img
                  onClick={() => {
                    navigate(`/product/${product.name}`, { state: { product } })
                  }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-24 p-4 sm:h-28 md:h-32 lg:h-36 object-cover"
                />
                <div className="p-2 sm:p-3 lg:p-4">
                  <h2
                    className={`font-medium capitalize truncate ${darkMode ? "text-gray-800" : "text-gray-200"
                      } text-xs sm:text-sm lg:text-base`}
                  >
                    {product.name}
                  </h2>
                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <p
                      className={`font-semibold ${darkMode ? "text-gray-700" : "text-gray-300"
                        } text-xs sm:text-sm lg:text-base`}
                    >
                      ₹{product.price}
                    </p>
                    <p className="text-xs text-green-500 sm:text-sm">
                      {product.discount}% off
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="w-full py-1.5 sm:py-2 flex items-center justify-center bg-red-50 text-red-600 text-xs sm:text-sm font-medium hover:bg-red-100 transition-colors"
              >
                <Heart size={12} className="mr-1 sm:mr-2" />
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 sm:py-16">
            <Heart
              size={32}
              className="mx-auto text-gray-400 mb-4 sm:size-40"
            />
            <p
              className={`text-base sm:text-lg lg:text-xl ${darkMode ? "text-gray-600" : "text-gray-400"
                }`}
            >
              Your wishlist is empty.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Wishlist;
