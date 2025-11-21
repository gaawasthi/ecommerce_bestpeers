import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const images = [
  "/banners/1338bd4fc60390d8.webp",
  "/banners/officeChairs.webp"
];

const AddBanners = () => {
  return (
    <div className="w-full h-48 md:h-64 lg:h-80 bg-white rounded-xl overflow-hidden shadow-md">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx} className="w-full h-full">
            <img
              src={src}
              alt={`Promotional Banner ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AddBanners;