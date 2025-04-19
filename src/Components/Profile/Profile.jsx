import {
  Bell,
  CirclePlus,
  CreditCard,
  Gift,
  Home,
  LogOut,
  Moon,
  Package,
  SunDim,
  X,
  Pencil,
} from "lucide-react";
import { tailChase } from "ldrs";
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Context/AuthProvider";
const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const zoomRef = useRef(null);

  tailChase.register();

  const features = [
    { id: 1, name: "address", icon: <CirclePlus className="pl-2" />, link: "/address" },
    { id: 2, name: "card", icon: <CreditCard className="pl-2" />, link: "/card" },
    { id: 3, name: "order history", icon: <Package className="pl-2" />, link: "/orderhistory" },
    { id: 4, name: "coupon", icon: <Gift className="pl-2" />, link: "/coupon" },
  ];
  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [user]);

  // Zoom close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (zoomRef.current && !zoomRef.current.contains(event.target)) {
        setIsZoomed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getPhotoUrl = (photoPath) => {
    // If it's already a full URL, return as is
    if (photoPath?.startsWith('http')) return photoPath;

    // Otherwise construct the full URL (adjust this based on your server setup)
    return `http://freshveg-backend.onrender.com/uploads/${photoPath}`;
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout");
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen p-2 ${darkMode ? "bg-green-200" : "bg-black"}`}>
      {isZoomed && user?.photo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div ref={zoomRef} className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={`http://freshveg-backend.onrender.com/uploads/${user.photo}`}
              className="w-full h-full object-contain rounded-md"
              alt={user.name}
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-gray-200 transition"
              aria-label="Close Zoom"
            >
              <X className="text-black" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div
        className={`w-full h-16 py-2 rounded-md mb-2 flex justify-between px-5 items-center ${darkMode ? "bg-white" : "bg-gray-700 text-white"
          }`}
      >
        <Link
          to="/"
          className="border-2 hover:translate-x-1.5 duration-700 border-green-700 rounded-full p-2 hover:bg-green-100 transition"
          aria-label="Home"
        >
          <Home />
        </Link>
        <div className="flex gap-3 items-center">
          {user ? (
            user.photo ? (
              <img
                onClick={() => setIsZoomed(true)}
                src={getPhotoUrl(user.photo)}
                className="h-10 w-10 object-cover rounded-full cursor-pointer border border-gray-400 hover:scale-105 transition"
                alt={user.name || "User"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(user.name || "User") + "&size=128";
                }}
              />
            ) : (
              <div
                className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer"
                onClick={() => setIsZoomed(true)}
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300"></div>
          )}

          <button
            onClick={toggleTheme}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${darkMode
              ? "border-gray-800 bg-gray-800 text-white"
              : "border-green-800 bg-white text-black"
              } cursor-pointer hover:opacity-80 transition`}
            aria-label="Toggle theme"
          >
            {darkMode ? <SunDim /> : <Moon />}
          </button>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${logoutLoading
              ? "border-gray-400 bg-gray-400 cursor-not-allowed"
              : "border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white"
              } transition duration-300`}
            title="Logout"
            aria-label="Logout"
          >
            {logoutLoading ? (
              <l-tail-chase size="20" speed="1.5" color="white"></l-tail-chase>
            ) : (
              <LogOut />
            )}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="w-full h-[70vh] flex flex-col justify-center items-center">
          <l-tail-chase size="40" speed="2.1" color={darkMode ? "black" : "white"}></l-tail-chase>
          <p className={`mt-4 ${darkMode ? "text-black" : "text-white"}`}>Loading profile...</p>
        </div>
      ) : user ? (
        <>
          {/* Profile Info */}
          <div
            className={`p-4 rounded-md hidden md:flex gap-4 items-center ${darkMode ? "bg-white text-black" : "bg-gray-800 text-white"
              }`}
          >
            {user.photo ? (
              <img
                src={getPhotoUrl(user.photo)}
                className="w-32 h-32 object-cover rounded-2xl cursor-pointer hover:scale-105 duration-500 border-2 border-gray-300"
                alt={user.name || "User"}
                onClick={() => setIsZoomed(true)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(user.name || "User") + "&size=256";
                }}
              />
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div className="flex flex-col items-start">
              <p className="capitalize text-xl font-bold">{user.name || "User"}</p>
              <p className="text-sm text-gray-400">{user.email || "No email provided"}</p>
              {user.createdAt && (
                <p className="text-sm mt-1">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              )}
              <Link
                to="/edit-profile"
                className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Mobile Edit Button */}
          <div
            className={`md:hidden p-2 rounded-md my-2 text-center font-serif ${darkMode ? "bg-gray-100" : "bg-zinc-700"
              }`}
          >
            <Link
              to="/edit-profile"
              className={`w-full flex justify-center items-center gap-2 py-2 font-semibold rounded-md shadow-sm ${darkMode ? "bg-white text-black" : "bg-gray-300 text-black"
                } hover:bg-blue-600 hover:text-white transition`}
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>

          {/* Features */}
          <div
            className={`grid grid-cols-2 gap-3 p-2 rounded-md ${darkMode ? "bg-gray-100" : "bg-zinc-700"
              }`}
          >
            {features.map((feature) => (
              <Link
                to={feature.link}
                key={feature.id}
                className={`p-3 flex items-center justify-between rounded-md capitalize font-serif shadow-sm hover:bg-green-100 active:scale-95 transition duration-300 ${darkMode ? "bg-white text-black" : "bg-gray-300 text-black"
                  }`}
              >
                <span>{feature.name}</span>
                {feature.icon}
              </Link>
            ))}
          </div>
          {/* Notifications */}
          <div className={`mt-3 p-3 rounded-md ${darkMode ? "bg-white" : "bg-gray-800"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Bell className={`${darkMode ? "text-black" : "text-white"}`} />
              <h3 className={`font-semibold ${darkMode ? "text-black" : "text-white"}`}>
                Notifications
              </h3>
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-600" : "text-gray-300"}`}>
              You have no new notifications
            </p>
          </div>
        </>
      ) : (
        <p className={`text-center text-xl mt-10 ${darkMode ? "text-black" : "text-white"}`}>
          User not found. Please log in.
        </p>
      )}
    </div>
  );
};

export default Profile;
