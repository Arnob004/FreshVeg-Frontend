import React, { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const otpRefs = useRef([]);
    const navigate = useNavigate();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;    
    const handleSendEmail = async () => {
        if (!email.trim()) return toast.error("ইমেইল দিন!");
        try {
            await axios.post(`https://freshveg-backend.onrender.com/forgot-password`, { email });
            toast.success("OTP পাঠানো হয়েছে!");
            setStep(2);
        } catch (err) {
            toast.error("ইমেইল পাঠাতে সমস্যা হয়েছে!");
        }
    };

    const handleVerifyOTP = async () => {
        const code = otp.join("");
        if (code.length !== 4) return toast.error("৪ ডিজিটের OTP দিন!");

        try {
            console.log("Verifying OTP:", code);  // Debug log here to verify value
            await axios.post(`https://freshveg-backend.onrender.com/verify-otp`, { email, otp: code });
            toast.success("OTP সঠিক!");
            setStep(3);
        } catch (err) {
            toast.error("ভুল OTP!");
        }
    };


    const handleSetNewPassword = async () => {
        if (newPassword.length < 6)
            return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");

        try {
            await axios.post(`https://freshveg-backend.onrender.com/reset-password`, {
                email,
                otp: otp.join(""),
                newPassword,
            });
            toast.success("পাসওয়ার্ড সফলভাবে সেট হয়েছে!");
            navigate("/");
        } catch (err) {
            toast.error("পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে!");
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            otpRefs.current[index + 1].focus();
        }
        if (!value && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 font-sans"
            style={{
                background: "linear-gradient(-45deg, #3b82f6, #ec4899, #06b6d4)",
                backgroundSize: "400% 400%",
                animation: "gradientBG 12s ease infinite",
            }}
        >
            <Toaster />
            <div className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-96 space-y-6 relative">
                <Link className="absolute right-4 top-4 text-gray-500 hover:text-black" to="/login">
                    <Home size={22} />
                </Link>
                <h2 className="text-2xl font-bold text-center text-gray-800">🔐 Forget Password</h2>

                {step === 1 && (
                    <>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={handleSendEmail}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                            Send OTP
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="flex justify-center space-x-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    ref={(el) => (otpRefs.current[index] = el)}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none shadow-sm"
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleVerifyOTP}
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
                        >
                            Verify OTP
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <button
                            onClick={handleSetNewPassword}
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all"
                        >
                            Set New Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;
