import React, { useState } from "react";
import NavbarLogin from "../../components/NavbarLogin";
import FooterUser from "../../components/Footer";
import KeranjangComponents from "../../components/home/KeranjangComponent";
import LabelKeranjang from "../../components/home/LabelKeranjang";

const KeranjangPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavbarLogin />
      <LabelKeranjang />
      <div className="mr-5 ml-5">
        <KeranjangComponents />
      </div>
      <FooterUser />
    </>
  );
};

export default KeranjangPage;
