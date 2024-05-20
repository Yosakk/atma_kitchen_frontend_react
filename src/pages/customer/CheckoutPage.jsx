import React from "react";
import Lottie from "lottie-react";
import AnimationPage from "../../assets/images/Animation - 1716104307179.json";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function CheckoutPage() {
  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <Lottie
          animationData={AnimationPage}
          loop={true}
          autoplay={true}
          style={{ width: 300, height: 300 }}
        />
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold">Transaksi Berhasil</h2>
          <p>Silahkan Tunggu Konfirmasi Dari Admin</p>
        </div>
      </div>
      <div className="w-full flex justify-center mt-4">
        <div className="w-full max-w-md">
        <Link to="/customer/profile">
          <Button className="w-full">Back To Profile</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
