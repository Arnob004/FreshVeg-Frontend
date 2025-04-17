import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const bannerPics = [
    "https://t3.ftcdn.net/jpg/06/78/80/52/360_F_678805216_uyrz0mmGCHIUcyvcnFXpDQl7TpTQv5tH.jpg",
    "https://t3.ftcdn.net/jpg/06/36/56/16/360_F_636561614_10daNhESbh73x8g7OMfxXJFWXcLLzZZD.jpg",
    "https://t3.ftcdn.net/jpg/01/45/59/12/360_F_145591293_3fUNngBm3W7XGHaZJUW28wcI3JEapLfi.jpg",
    "https://t3.ftcdn.net/jpg/01/63/13/22/360_F_163132265_oVOYBAT3JyPGrrER1w9B5vfZvM6Xh7lL.jpg",
    "https://t3.ftcdn.net/jpg/02/07/60/36/360_F_207603643_IlBb4wdCwADpzeJXUC47S8QiEgnNV7ue.jpg",
    "https://img.freepik.com/free-vector/hand-drawn-style-food-twitter-header_23-2149052373.jpg",
  ];

  return (
    <div className="w-full md:p-2 p-2">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // pagination={{ clickable: true }}
        // navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full bg-green-200 rounded-md overflow-hidden shadow-md duration-500 h-50 md:h-64"
      >
        {bannerPics.map((pic, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-full object-cover bg-center"
              src={pic}
              alt={`Banner ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
