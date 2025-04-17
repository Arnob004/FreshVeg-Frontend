import React, { useState, useEffect, useContext, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Heart, ShoppingCart, User, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";
import { AuthContext } from "../../Context/AuthProvider";

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { darkMode } = useTheme();
  const { user, isLogin } = useContext(AuthContext); // ✅ UNCOMMENT THIS

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-serif ${darkMode ? "bg-white" : "bg-gray-800 text-white"
        } shadow-md`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Leaf className="h-8 w-8 text-green-500 mr-2" aria-hidden="true" />
            <Link
              to="/"
              className="text-xl font-bold text-green-700 sm:text-2xl md:text-3xl focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
            >
              FreshVeg
              <span className="sr-only">Home</span>
            </Link>
          </div>

          {/* Search Box (Desktop) */}
          <div className="hidden md:flex rounded-xl border-none border-green-800 flex-1 max-w-lg mx-4">
            <SearchBox
              isSearchFocused={isSearchFocused}
              setIsSearchFocused={setIsSearchFocused}
            />
          </div>

          {/* Navbar Icons */}
          <div className="flex items-center gap-4">
            <NavbarIcon
              icon={<Heart size={20} aria-hidden="true" />}
              label="wishlist"
              isMobile={isMobile}
              isLogin={isLogin}
            />
            <NavbarIcon
              icon={<ShoppingCart size={20} aria-hidden="true" />}
              label="cart"
              isMobile={isMobile}
              isLogin={isLogin}
            />
            <NavbarIcon
              icon={
                isLogin && user ? (
                  <div className="relative">
                    <span className="sr-only">User profile</span>
                    <div className="absolute top-5 hidden right-0 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                    <img
                      className="w-7 h-7 rounded-full object-cover border border-green-400"
                      src={`http://localhost:5040/uploads/${user.photo}`}
                      alt={user.name || "User profile"}
                    />
                  </div>
                ) : (
                  <User size={20} aria-hidden="true" />
                )
              }
              label="profile"
              isMobile={isMobile}
              isLogin={isLogin}
            />
          </div>
        </div>
      </div>

      {/* Search Box (Mobile) */}
      <div className="md:hidden border-t border-green-200 px-2 py-2">
        <SearchBox
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
        />
      </div>
    </nav>
  );
};

const SearchBox = ({ isSearchFocused, setIsSearchFocused }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <motion.div
      animate={{ width: isSearchFocused ? "100%" : "100%" }}
      transition={{ duration: 0.3 }}
      className="relative w-full"
    >
      <form onSubmit={handleSearch} role="search">
        <input
          type="search"
          placeholder="Search for vegetables..."
          className="w-full py-2 pl-10 pr-4 outline-none text-sm sm:text-base rounded-md border border-green-800 focus:ring-2 focus:ring-green-500"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search for vegetables"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400"
          aria-label="Submit search"
        >
          <Search size={18} aria-hidden="true" />
        </button>
      </form>
    </motion.div>
  );
};

const NavbarIcon = ({ icon, label, isMobile, isLogin }) => {
  const route =
    label === "profile" ? (isLogin ? "profile" : "login") : label.toLowerCase();
  const displayLabel =
    label === "profile" ? (isLogin ? "Profile" : "Login") : label;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
    >
      <Link
        to={`/${route}`}
        className="flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-green-500 rounded p-1"
        aria-label={displayLabel}
      >
        {icon}
        {!isMobile && (
          <span className="mt-1 text-xs sm:text-sm text-green-700">
            {displayLabel}
          </span>
        )}
      </Link>
    </motion.div>
  );
};

export default Navbar;