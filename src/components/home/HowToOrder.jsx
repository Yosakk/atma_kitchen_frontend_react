import React from "react";
import mainImage from "../../assets/images/Carousel/background-906135_1280.jpg"; // Ganti dengan path yang benar
import cornerImage from "../../assets/images/christmas-hamper-2422306_1280-removebg-preview.png"; // Ganti dengan path yang benar

const HowToOrder = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-5 md:p-10 relative bg-white">
      <div className="w-full md:w-1/2">
        <div className="relative m-5 md:m-10">
          <img
            src={mainImage}
            alt="Atma Kitchen Food"
            className="relative w-full h-auto md:w-70 md:h-90 object-cover"
            style={{ borderRadius: "300px 0 350px 0 " }}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 pl-5 md:pl-12 relative">
        <h2 className="text-3xl md:text-6xl font-bold mb-3">How To Order?</h2>
        <p className="mb-5 md:mb-8 text-base md:text-xl">
          Atma Kitchen are hot and baked for you. Preorders available at our
          locations until they sell out!
        </p>
        <ol className="list-decimal pl-5 md:pl-8">
          <li className="text-base md:text-lg mb-2">Step one description</li>
          <li className="text-base md:text-lg mb-2">Step two description</li>
          <li className="text-base md:text-lg">Step three description</li>
        </ol>
      </div>
      <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden">
        <img
          src={cornerImage}
          alt="Decorative Accent"
          className="absolute -right-5 md:-right-20 -bottom-8 md:-bottom-24 w-1/4 md:w-1/5"
          style={{ transform: "rotate(-45deg)" }}
        />
      </div>
    </div>
  );
};

export default HowToOrder;
