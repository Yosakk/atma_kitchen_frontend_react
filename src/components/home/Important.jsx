import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";

const currentYear = new Date().getFullYear();
const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});
const Important = () => {
return (
    <div className="w-full bg-[#FFC655] md:px-8">
        <div className="flex flex-col items-center justify-center px-4 pt-5 sm:flex-row sm:justify-between">
        <Typography
            variant="h3"
            className="text-red-600"
            style={{ fontFamily: "Rufina" }}
        >
            !Important
        </Typography>
        <Typography
            variant="h5"
            style={{ fontFamily: "Rufina" }}
        >
            {currentDate}
        </Typography>
        </div>
        <div className="flex w-full flex-col items-center justify-center border-blue-gray-50 py-4 px-4 pt-5  md:flex-row md:justify-between">
            <Typography
            variant="small"
            className="mb-4 text-center font-normal text-red-900 md:mb-0"
            >
            Pilihan produk akan berubah sesuai dengan tanggal dan ketersedian
            stok! 
            </Typography>
        </div>
    </div>
);
};

export default Important;
