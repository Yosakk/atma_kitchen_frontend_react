import React, { useState } from "react";
import { Navbar } from "../../widgets/layout";
import NavbarLogin from "../../components/NavbarLogin";
import FooterUser from "../../components/Footer";
import { CarouselWithContent } from "../../components/home/Carousel";
import Important from "../../components/home/Important";
import WhyOrderHere from "../../components/home/WhyOrderHere";
import AboutUs from "../../components/home/AboutUs";
import HowToOrder from "../../components/home/HowToOrder";
import OurProduct from "../../components/home/OurProduct";

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
        <NavbarLogin/>
        <CarouselWithContent/>
        <Important/>
        <WhyOrderHere/>
        <AboutUs/>
        <HowToOrder/>
        <OurProduct/>
        <FooterUser/>

        </>
    );
}

export default HomePage;
