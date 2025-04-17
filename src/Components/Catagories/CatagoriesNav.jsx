import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useTheme } from "../../Context/ThemeProvider";

const categories = [
  "Mobile",
  "Electronic",
  "Fast Food",
  "Decoration",
  "Boys Toy",
  "Gift",
  "Fashion",
  "Books",
  "Fitness",
];

const CategoriesNav = () => {
  const swiperRef = useRef(null);
  const { darkMode } = useTheme();
  return (
    <div
      className={`w-full md:mt-16 mt-32  rounded-md md:h-20 h-14 p-3 shadow-md flex items-center ${
        darkMode ? "bg-white" : "bg-gray-800 text-white"
      }  relative`}
    >
      {/* Left Arrow */}
      {/* <button
        className="absolute left-2 cursor-pointer top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:flex"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ArrowLeft size={20} />
      </button> */}
      {/* Swiper Slider */}
      <Swiper
        spaceBetween={10}
        slidesPerView={2.5}
        breakpoints={{
          640: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation]}
        className="w-full"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <Link to={`/${category}`}>
              <span
                className={`block px-4 py-2 border rounded-3xl text-center text-sm md:text-base  cursor-pointer hover:bg-gray-100 duration-200`}
              >
                {category}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Arrow */}
      {/* <button
        className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden md:flex"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ArrowRight size={20} />
      </button> */}
    </div>
  );
};

export default CategoriesNav;
