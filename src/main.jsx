import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Login from "./Components/Login/Login.jsx";
import ViewItems from "./Components/Pages/ViewItems.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import AddNewAddress from "./Components/Pages/Address.jsx";
import OrderHistory from "./Components/Pages/OrderHistory.jsx";
import Order from "./Components/Order/Order.jsx";

import ThemeProvider from "./Context/ThemeProvider.jsx";
import { AuthProvider } from "./Context/AuthProvider.jsx";
import ProtectedRoute from "./ProtectRoute/ProtectedRoute.jsx";
import ForgetPassword from "./Components/Pages/ForgetPassword.jsx";

// ✅ Protected routes list
const protectedRoutes = [
  { path: "/cart", element: <Cart /> },
  { path: "/profile", element: <Profile /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/orderhistory", element: <OrderHistory /> },
  { path: "/address", element: <AddNewAddress /> },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* 🌐 Public Routes */}
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/product/:name" element={<ViewItems />} />
            <Route path="/:name/:id" element={<Order />} />
            <Route path="/admin" element={<Admin />} />
            {/* 🔐 Protected Routes (clean & dynamic) */}
            {protectedRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute>{element}</ProtectedRoute>}
              />
            ))}
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  </StrictMode>
);
