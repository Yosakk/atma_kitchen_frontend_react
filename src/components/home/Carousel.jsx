import React, { useRef, useState } from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import image1 from "../../assets/images/Carousel/background-906135_1280.jpg";
import image2 from "../../assets/images/Carousel/food-2571514_1280.jpg";
import image3 from "../../assets/images/Carousel/rice-2103481_1280.jpg";
import logo from "../../assets/images/img0.png";

export function CarouselWithContent() {
  return (
    <div className="relative">
      <Carousel
        className=" w-full h-[80vh] md:h-[90vh] lg:h-[100vh] xl:h-[80vh] 2xl:h-[90vh] mt-10"
        infinite={true}
        loop={true}
        autoplay={{ delay: 500 }}
        animationSpeed={1000}
      >
        <div className="relative h-full w-full">
          <img
            src={image1}
            alt="image 1"
            className="h-full w-full object-cover filter brightness-75"
          />
        </div>
        <div className="relative h-full w-full">
          <img
            src={image2}
            alt="image 2"
            className="h-full w-full object-cover filter brightness-75"
          />
        </div>
        <div className="relative h-full w-full">
          <img
            src={image3}
            alt="image 3"
            className="h-full w-full object-cover filter brightness-75"
          />
        </div>
      </Carousel>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-3/4 md:w-2/4 lg:w-1/4 text-white">
        <img
          src={logo}
          alt="Logo"
          className="h-15 w-15 md:h-25 md:w-25 xl:h-30 xl:w-30 object-cover mx-auto mb-5 "
        />
        <Typography
          variant="h1"
          color="white"
          className="mb-4 text-2xl md:text-3xl lg:text-4xl text-[#FFC655]"
        >
          Where Flavor Meets Convenience!
        </Typography>
        <Typography
          variant="lead"
          color="white"
          className="mb-5 opacity-80 text-sm md:text-base lg:text-lg"
        >
          Selamat datang di Atma Kitchen, tempat di mana keunggulan kuliner
          bertemu dengan kenyamanan, menawarkan pengalaman yang memikat bagi
          lidah Anda.
        </Typography>
        <div className="flex justify-center">
          <Button size="lg" color="white" className="rounded-xl bg-[#FFC655]">
            Shop Now
          </Button>
          
        </div>
      </div>
    </div>
    
  );
}
