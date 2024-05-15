import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";

const LabelKeranjang = () => {
  return (
    <div className="w-full bg-[#FFC655] md:px-8 flex flex-col items-center justify-center pt-10 pb-10">
      <div className="flex flex-col items-center justify-center px-4 pt-5 sm:flex-row sm:justify-between">
        <Typography
          variant="h1"
          className="text-Black-600"
          style={{ fontFamily: "Rufina" }}
        >
          Keranjang
        </Typography>
        <Typography variant="h5" style={{ fontFamily: "Rufina" }}></Typography>
      </div>
      <div className="flex flex-col items-center justify-center px-4 pt-5 sm:flex-row sm:justify-between">
        <Typography
          variant="h4"
          className="mb-4 text-center font-normal text-Black-900 md:mb-0"
        >
          Ayo segera check out pesanan Anda!
        </Typography>
      </div>
    </div>
  );
};

export default LabelKeranjang;
