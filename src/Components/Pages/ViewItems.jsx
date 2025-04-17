"use client";

import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { tailChase } from "ldrs";
import { ArrowLeft, Star, Heart, Share2, ShoppingCart } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";
import { toast, ToastContainer } from "react-toastify";

function ViewItems() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Track if product is in wishlist
  const [rating] = useState(4.5);
  const [couponApplied, setCouponApplied] = useState(false);

  const { darkMode } = useTheme();
  const notify = (data) =>
    toast.success(
      data.charAt(0).toUpperCase() + data.slice(1) + " added to cart"
    );
  tailChase.register();
  // Ensure product has a stable ID and sync wishlist status
  useEffect(() => {
    if (!product) return;

    // Assign a stable ID if missing (only needed if product.id isn’t provided)
    if (!product.id) {
      product.id = Date.now();
    }
    // Sync isFavorite with wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    setIsFavorite(isInWishlist);
  }, [product]);

  // Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return (
      <div className="flex relative w-full justify-center items-center h-screen bg-green-200">
        <Link
          className="bg-white p-4 absolute top-4 left-4 rounded-lg shadow-sm"
          to="/"
        >
          Go back
        </Link>
        <h2 className="text-2xl font-semibold text-red-500">
          No product found! 😀😀😀
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-green-200">
        <l-tail-chase size="40" speed="1.2" color="black"></l-tail-chase>
      </div>
    );
  }

  const toggleFavorite = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isInWishlist = wishlist.some((item) => item.id === product.id);

    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsFavorite(false);
      toast.success("Removed from wishlist");
    } else {
      // Add to wishlist
      const wishlistItem = {
        id: product.id, // Use the stable ID
        name: product.name,
        price: product.price,
        image: product.image,
        discount: product.discount,
      };
      const updatedWishlist = [...wishlist, wishlistItem];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsFavorite(true);
      toast.success("Added to wishlist");
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/product/${product.name}`;
    // Copy URL to clipboard
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });

    // Navigate to the product page
    navigate(`/product/${product.name}`, { state: { product } });
  };

  const applyCoupon = () => {
    setCouponApplied(true);
    alert("Coupon applied successfully!");
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === cartItem.id);

    if (existingItem) {
      const updatedCart = existingCart.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }
    notify(product.name);
  };
  const generateOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = 'ORD-';
    for (let i = 0; i < 8; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  };
  const handleBuyNow = () => {
    const orderId = generateOrderId();
    navigate(`/order/${orderId}`, { state: { product } });
  };
  return (
    <div className="h-screen overflow-y-scroll bg-green-200 p-4">
      <ToastContainer autoClose={2000} />
      <div
        className={`max-w-6xl mx-auto ${darkMode ? "bg-white" : "bg-gray-700 text-white"
          } p-4 rounded-lg shadow-sm`}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center text--600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="ml-2">Back</span>
        </button>
      </div>

      <div
        className={`max-w-6xl mx-auto mt-4 ${darkMode ? "bg-white" : "text-white bg-gray-800"
          } p-6 rounded-lg shadow-sm`}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto hover:scale-105 duration-300 shadow-sm rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-2xl capitalize font-bold text--800">
              {product.name}
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="ml-2 text--600">({rating})</span>
            </div>
            <div className="mt-4">
              <h2 className="text-3xl font-bold text--900">₹{product.price}</h2>
              <p className="text-sm text--500 line-through">
                {product.originalPrice}
              </p>
              <p className="text-green-600 font-semibold">
                {product.discount}% off
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text--800">Offers</h3>
              <ul className="list-disc list-inside text-sm text--600">
                <li>Fast Delivery</li>
                <li>Easy Returns</li>
                <li>Bank Offer: 10% off on ICICI Bank Credit Cards</li>
                <li>
                  Coupon:{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={applyCoupon}
                  >
                    {couponApplied ? "Applied" : "Click to apply"}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex cursor-pointer items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
              >
                <ShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button onClick={handleBuyNow}
                className="flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full md:w-auto">
                Buy Now
              </button>
              <button
                onClick={toggleFavorite}
                className={`flex items-center cursor-pointer justify-center p-3 rounded-lg border ${isFavorite
                  ? "bg-red-100 border-red-500 text-red-600"
                  : "bg-gray-100 border-gray-300 text-gray-600"
                  } hover:bg-gray-200 transition-colors w-full md:w-auto`}
              >
                <Heart className="mr-2" />
                {isFavorite ? "Remove" : "Add to Wishlist"}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center cursor-pointer justify-center p-3 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors w-full md:w-auto"
              >
                <Share2 className="mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text--800">
            Product Description
          </h3>
          <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold text--800">Customer Reviews</h3>
          <div className="mt-4">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="ml-2 text--600">({rating} out of 5)</span>
            </div>
            <p className="text-sm text--600 mt-2">
              "Great product! Highly recommended."
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ViewItems;
