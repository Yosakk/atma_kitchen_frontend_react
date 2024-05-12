import React from "react";
import image1 from "../../assets/images/Carousel/background-906135_1280.jpg";
import image2 from "../../assets/images/Carousel/food-2571514_1280.jpg";
import image3 from "../../assets/images/Carousel/rice-2103481_1280.jpg";

const AboutUs = () => {
  return (
    <div className="bg-[#FFC655] px-6 md:px-20 py-10 flex flex-col md:flex-row justify-between items-center" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="md:w-2/3 mb-8 md:mb-0 md:mr-12">
        <h1 className="text-4xl md:text-7xl font-bold mb-6">About Us</h1>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl">
          Atma Kitchen adalah perusahaan yang mengutamakan pesanan pre-order kue,
          roti, dan minuman, serta menyediakan produk ready stock berkualitas
          tinggi untuk memenuhi kebutuhan kuliner Anda dengan cita rasa istimewa
          dan layanan yang andal.
        </p>
      </div>
      <div className="md:w-1/3 grid grid-cols-2 gap-4">
        <img src={image1} alt="Kitchen Item" className="rounded-lg w-full h-auto" />
        <img src={image2} alt="Kue Lapis" className="rounded-lg w-full h-auto" />
        <img src={image3} alt="Roti" className="rounded-lg col-span-2" />
      </div>
    </div>
  );
};

export default AboutUs;
