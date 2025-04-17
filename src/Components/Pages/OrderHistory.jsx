import {
  Home,
  Package,
  Clock,
  CheckCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";
import { motion } from "framer-motion";

const OrderHistory = () => {
  const { darkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Sample order data
  useEffect(() => {
    const sampleOrders = [
      {
        id: 1,
        productName: "Tomato",
        image:
          "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQbbwBDcqdhh7ZS9iLL-PSRgiSkCB4Dlbxlj4srj1qD_pBdV8Y3oPHuKeezZsiz29kYbRvgkL13Khfg7H8jt3twquFLLXXY7KVV6nottVk",
        price: 49.99,
        quantity: 2,
        date: "2025-03-28",
        status: "Delivered",
        trackingNumber: "TRK123456",
        deliveryDate: "2025-03-30",
      },
      {
        id: 2,
        productName: "Cucumber",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eYvamW5fAOh66Y6nGJDhJELoWvC-QpWvDA&s",
        price: 29.99,
        quantity: 1,
        date: "2025-03-25",
        status: "Shipped",
        trackingNumber: "TRK789012",
        deliveryDate: "2025-04-02",
      },
    ];
    setOrders(sampleOrders);
  }, []);

  const handleReorder = (order) => {
    console.log(`Reordering ${order.productName}`);
    // Add to cart logic here
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div
      className={`w-full min-h-screen ${
        darkMode ? "bg-gray-100" : "bg-gray-900"
      } px-4 sm:px-6 lg:px-8 py-6`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full flex items-center justify-between p-4 rounded-xl shadow-lg ${
          darkMode ? "bg-white" : "bg-gray-800"
        } mb-6`}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-300`}
          >
            <Home size={20} />
          </Link>
          <h1
            className={`text-xl sm:text-2xl md:text-3xl font-bold ${
              darkMode ? "text-gray-800" : "text-white"
            }`}
          >
            Order History
          </h1>
        </div>
      </motion.div>

      {/* Order List */}
      <div
        className={`w-full rounded-xl shadow-lg p-4 sm:p-6 ${
          darkMode ? "bg-white" : "bg-gray-800"
        }`}
      >
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg overflow-hidden shadow-md ${
                  darkMode ? "bg-gray-50" : "bg-gray-700"
                } hover:shadow-xl transition-shadow duration-300`}
              >
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleExpand(order.id)}
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <img
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
                      src={order.image}
                      alt={order.productName}
                    />
                    <div>
                      <h2
                        className={`text-lg sm:text-xl font-semibold ${
                          darkMode ? "text-gray-800" : "text-white"
                        }`}
                      >
                        {order.productName}
                      </h2>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-600" : "text-gray-300"
                        }`}
                      >
                        Ordered on: {order.date}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : "text-yellow-500"
                        }`}
                      >
                        <CheckCircle size={16} className="inline mr-1" />
                        {order.status}
                      </p>
                    </div>
                  </div>
                  {/* Price & Action */}
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <p
                      className={`text-lg font-bold ${
                        darkMode ? "text-gray-900" : "text-white"
                      }`}
                    >
                      ₹{(order.price * order.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReorder(order);
                      }}
                      className={`p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors`}
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>
                </div>
                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 border-t ${
                      darkMode ? "border-gray-200" : "border-gray-600"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-600" : "text-gray-300"
                          }`}
                        >
                          <Package size={16} className="inline mr-2" />
                          Quantity: {order.quantity}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-600" : "text-gray-300"
                          }`}
                        >
                          <Clock size={16} className="inline mr-2" />
                          Delivery Date: {order.deliveryDate}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-600" : "text-gray-300"
                          }`}
                        >
                          Tracking Number: {order.trackingNumber}
                        </p>
                        <p
                          className={`text-sm font-semibold ${
                            darkMode ? "text-gray-800" : "text-white"
                          }`}
                        >
                          Price per unit: ₹{order.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div
                  className={`flex justify-center p-2 ${
                    darkMode ? "bg-gray-100" : "bg-gray-600"
                  }`}
                >
                  {expandedOrder === order.id ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <Package
              size={48}
              className={`mx-auto mb-4 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <p
              className={`text-lg sm:text-xl md:text-2xl ${
                darkMode ? "text-gray-600" : "text-gray-400"
              }`}
            >
              Your order history is empty.
            </p>
            <Link
              to="/"
              className={`mt-6 inline-block py-2 px-6 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base font-medium bg-green-500 text-white hover:bg-green-600 transition-all duration-300`}
            >
              Shop Now
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
