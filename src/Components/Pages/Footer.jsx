import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">ShopMate</h2>
          <p className="text-sm text-gray-400 mt-2">
            Your trusted e-commerce platform, where you get quality products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Products</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        {/* Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">Email: support@shopmate.com</p>
          <p className="text-gray-400">Phone: +880 1234 567 890</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-gray-400 hover:text-white"><Facebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Twitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Linkedin size={24} /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
        &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
