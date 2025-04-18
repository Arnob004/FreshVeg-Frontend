import React, { useState, useEffect } from "react";
import { PanelRight, X, Bell } from "lucide-react";
import axios from "axios";

const Admin = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`https://freshveg-backend.onrender.com/user/me`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, []);

  const handleNotificationClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div>
            <h1 className="text-2xl font-bold text-green-800">Welcome, Admin</h1>
            <p className="text-green-700 mt-2">Here is your dashboard overview.</p>
          </div>
        );
      case "Products":
        return (
          <div className="p-4 border bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-green-700">Add Product</h2>
            <form>
              <input
                type="text"
                placeholder="Product Name"
                className="mt-2 p-2 border rounded-md w-full"
              />
              <input
                type="number"
                placeholder="Price"
                className="mt-2 p-2 border rounded-md w-full"
              />
              <button
                type="submit"
                className="mt-4 p-2 bg-green-700 text-white rounded-md w-full"
              >
                Add Product
              </button>
            </form>
          </div>
        );
      case "Users":
        return (
          <div className="p-4 border bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-green-700">Manage Users</h2>
            <div className="mt-4 flex gap-4">
              <button className="p-2 bg-green-700 text-white rounded-md">
                Add User
              </button>
              <button className="p-2 bg-yellow-600 text-white rounded-md">
                Block User
              </button>
              <button className="p-2 bg-red-600 text-white rounded-md">
                Remove User
              </button>
            </div>
          </div>
        );
      case "Payments":
        return (
          <div className="p-4 border bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-green-700">Payment History</h2>
            <table className="min-w-full mt-4">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">Payment ID</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4">1</td>
                  <td className="py-2 px-4">$500</td>
                  <td className="py-2 px-4">2023-10-01</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-green-100">
      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-md transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static`}
      >
        <div className="flex justify-between items-center p-3.5 border-b">
          <h2 className="text-lg font-bold text-green-700">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-green-700"
          >
            <X />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {["Dashboard", "Products", "Users", "Payments"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveTab(item);
                setSidebarOpen(false);
              }}
              className={`text-left p-2 rounded-md hover:bg-green-200 ${activeTab === item ? "bg-green-300 font-semibold" : ""
                }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Topbar */}
        <div className="h-14 bg-white shadow flex items-center justify-between px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-green-700"
          >
            <PanelRight />
          </button>
          <div className="flex items-center gap-2">
            {user && (
              <img
                className="h-10 w-10 rounded-full border shadow"
                src={`https://freshveg-backend.onrender.com/uploads/${user.photo}`}
                alt="user"
              />
            )}
            <button
              onClick={handleNotificationClick}
              className={`relative p-2 ${isShaking ? "animate-shake" : ""}`}
            >
              <Bell className="text-green-700" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 text-xs text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content based on activeTab */}
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Admin;
