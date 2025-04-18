import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../Hooks/useAuth'
import { Eye, EyeClosed, Home } from "lucide-react";
const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(null)
  const { setUser, setIsLogin } = useAuth(); // Login.jsx এ
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    photoPreview: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      if (file) {
        setFormData({
          ...formData,
          photo: file,
          photoPreview: URL.createObjectURL(file)
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email.trim()) return toast.error("ইমেইল দিন!");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("সঠিক ইমেইল দিন!");
    if (!password) return toast.error("পাসওয়ার্ড দিন!");
    try {
      setIsLoading(true);
      // Step 1: Login request
      const res = await axios.post(
        `${BACKEND_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      // Step 2: Get current user
      const userRes = await axios.get(`${BACKEND_URL}/user/me`, {
        withCredentials: true,
      });
      setUser(userRes.data.user);
      setIsLogin(true);
      toast.success("লগইন সফল!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "লগইন ব্যর্থ হয়েছে!");
      setIsLogin(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };


  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, photo } = formData;

    // Basic validations
    if (!name.trim()) return toast.error("নাম দিন!");
    if (!email.trim()) return toast.error("ইমেইল দিন!");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("সঠিক ইমেইল দিন!");

    // Password validations
    if (!password) return toast.error("পাসওয়ার্ড দিন!");
    if (password.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে 6 অক্ষরের হতে হবে!");
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/;
    if (!strongRegex.test(password)) {
      return toast.error("পাসওয়ার্ডে বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা ও স্পেশাল ক্যারেক্টার থাকতে হবে!");
    }

    // Photo validations
    if (!photo) return toast.error("একটি প্রোফাইল ইমেজ দিন!");
    if (!photo.type.startsWith("image/")) return toast.error("শুধু ইমেজ ফাইল আপলোড করুন!");
    if (photo.size > 2 * 1024 * 1024) return toast.error("ইমেজ 2MB এর কম হতে হবে!");

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("photo", photo);

    try {
      setIsLoading(true);
      const res = await axios.post(`${BACKEND_URL}/signup`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      toast.success("সাইনআপ সফল! এখন লগইন করুন।");
      setFormData({
        name: "",
        email: "",
        password: "",
        photo: null,
        photoPreview: null
      });
      setTimeout(() => setIsSignup(false), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "সাইনআপ ব্যর্থ হয়েছে!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-serif"
      style={{
        background: "linear-gradient(270deg, #3b82f6, #ec4899, #06b6d4)",
        backgroundSize: "600% 600%",
        animation: "gradientBG 10s ease infinite",
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="">
      </div>
      <div className=" bg-white p-8 rounded-xl shadow-lg relative w-full max-w-94">
        <div className="absolute top-2 right-2 rounded-full p-1" >
          <Link to="/" >
            <Home />
          </Link>
        </div>
        <h2 className="text-2xl font-serif text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit} className="space-y-4">
          {isSignup && (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-md"
              />
              <div className="flex flex-col items-center">
                {formData.photoPreview ? (
                  <img
                    src={formData.photoPreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-2">
                    No Photo
                  </div>
                )}
                <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                  {formData.photo ? "Change Photo" : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
            </>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
          />
          <div
            onClick={() => setshowpassword(prev => !prev)}
            className=" mt-1 cursor-pointer p-1 absolute right-10">
            {showpassword ? <Eye /> : <EyeClosed />}
          </div>
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            minLength={isSignup ? 6 : 1}
          />
          <div className="w-full flex text-sm text-blue-500 leading-2.5 capitalize font-serif justify-center">
            {!isSignup && (
              <div className="w-full flex text-sm text-blue-500 leading-2.5 capitalize font-serif justify-center">
                <Link to="/forget-password">Forget Password?</Link>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? (
              <span className="flex cursor-pointer items-center justify-center">
                {isSignup ? "Signing Up..." : "Logging In..."}
              </span>
            ) : (
              isSignup ? "Sign Up" : "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => {
              setIsSignup(!isSignup);
              setFormData({
                name: "",
                email: "",
                password: "",
                photo: null,
                photoPreview: null
              });
            }}
            disabled={isLoading}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div >
  );
};

export default Login;
