import React, { useState } from "react";
import NavbarLogin from "../../components/NavbarLogin";
import FooterUser from "../../components/Footer";

import Important from "../../components/home/Important";
import OurProductCatalogue from "../../components/home/OurProductCatalogue";
import { CarouselCatalog } from "../../components/home/CarouselCatalog";
import LabelKeranjang from "../../components/home/LabelKeranjang";
import KeranjangComponents from "../../components/home/KeranjangComponent";

const KatalogPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavbarLogin />
      <CarouselCatalog />
      <div>
        <Important />
      </div>
      <OurProductCatalogue />
      {/* <LabelKeranjang />
      <div className="mr-5 ml-5">
        <KeranjangComponents />
      </div> */}
      <FooterUser />
    </>
  );
};

export default KatalogPage;
