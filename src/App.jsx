import React, { useEffect, useRef, useState } from "react";
import Navber from "./Components/Navber/Navber";
import Banner from "./Components/Offer/Banner";
import ProductCard from "./Components/Product/ProductCard";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import "./index.css";
import Footer from "./Components/Pages/Footer";
import { useNavigate } from "react-router-dom";
import CatagoriesNav from "./Components/Catagories/CatagoriesNav";
import { useTheme } from "./Context/ThemeProvider";
import axios from "axios";
import { tailChase } from "ldrs";

function App() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);
  const BACKEND_URL = import.meta.env.REACT_APP_BACKEND_URL;  
  tailChase.register();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/product`);
        // Ensure response data is valid and an array
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error("Invalid product data format");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to load products. Please try again later.");
        setProducts([]); // Set empty array to prevent null reference
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    let scroll;

    const initScroll = () => {
      if (scrollRef.current) {
        scroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
        });
        locomotiveScrollRef.current = scroll;
      }
    };

    const timer = setTimeout(initScroll, 500);

    return () => {
      clearTimeout(timer);
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, [products]);

  const handleProductClick = (product) => {
    if (!product) return;
    navigate(`/product/${product.name}`, {
      state: { product },
      replace: true,
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <l-tail-chase
          size="40"
          speed="2.1"
          color={darkMode ? "black" : "white"}
        ></l-tail-chase>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-green-500">
        {error}
      </div>
    );
  }
  return (
    <>
      <div
        ref={scrollRef}
        // data-scroll-container
        className={`w-full p-1 h-screen overflow-auto ${
          darkMode ? "bg-green-200" : "bg-gray-700"
        } `}
      >
        <Navber />
        <CatagoriesNav />
        <Banner />
        {products && products.length > 0 ? (
          <div className="md:px-18 gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map(
              (product) =>
                product && ( // Add null check for each product
                  <ProductCard
                    key={product.id || product._id}
                    image={product.image || ""} // Provide fallback for image
                    discount={product.discount || 0}
                    name={product.name || "Unnamed Product"}
                    price={product.price || 0}
                    OrgPrice={product.OrgPrice || 0}
                    onClick={() => handleProductClick(product)}
                  />
                )
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p>No products available</p>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
