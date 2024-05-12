import React from "react";
import image1 from "../../assets/images/Lapis Legit/101274.jpg";
import image2 from "../../assets/images/Carousel/food-2571514_1280.jpg";
import image3 from "../../assets/images/Carousel/rice-2103481_1280.jpg";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const WhyOrderHere = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 md:mx-auto">
            <h2 className="text-3xl md:text-6xl font-bold text-center my-8">Why Order Here?</h2>
            <Typography className="text-center text-lg md:text-xl text-gray-600 mb-12">
                Nikmati kualitas terbaik dan pelayanan terpercaya di Atma Kitchen untuk
                memuaskan selera kuliner Anda!
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 ">
            <Card
                    shadow={false}
                    className="relative grid h-[30rem] max-w-[28rem] items-end justify-center overflow-hidden text-center"
                >
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                    >
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative py-14 px-6 md:px-12">
                        {/* <Typography
                            variant="h4"
                            color="white"
                            className="mb-6 font-medium leading-[1.5]"
                        >
                            Temukan Kreasi Kue Kami
                        </Typography> */}
                        <Typography className="text-white text-sm md:text-base">
                            Dari klasik favorit hingga spesial unik, pilihan kue dan pastry kami pasti akan memuaskan selera manis Anda.
                        </Typography>
                    </CardBody>
                </Card>
                <Card
                    shadow={false}
                    className="relative grid h-[30rem] max-w-[28rem] items-end justify-center overflow-hidden text-center"
                >
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                    >
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative py-14 px-6 md:px-12">
                        {/* <Typography
                            variant="h4"
                            color="white"
                            className="mb-6 font-medium leading-[1.5]"
                        >
                            Pengalaman Rasakan Kelezatan
                        </Typography> */}
                        <Typography className="text-white text-sm md:text-base">
                            Kami membanggakan diri pada kualitas produk kami dan layanan pelanggan yang luar biasa. Nikmati setiap gigitan dengan rasa puas dan kenangan manis bersama Atma Kitchen.
                        </Typography>
                    </CardBody>
                </Card>
                <Card
                    shadow={false}
                    className="relative grid h-[30rem] max-w-[28rem] items-end justify-center overflow-hidden text-center"
                >
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                    >
                        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                    </CardHeader>
                    <CardBody className="relative py-14 px-6 md:px-12">
                        {/* <Typography
                            variant="h4"
                            color="white"
                            className="mb-6 font-medium leading-[1.5]"
                        >
                            Penyajian Kue yang Unik
                        </Typography> */}
                        <Typography className="text-white text-sm md:text-base">
                            Setiap kreasi kue kami tidak hanya lezat tetapi juga indah. Berikan sentuhan yang sempurna pada acara spesial Anda dengan kue-kue kami yang menarik dan memikat ini.
                        </Typography>s
                    </CardBody>
                </Card>
                {/* Repeat the above Card component for other cards */}
            </div>
        </div>
    );
};

export default WhyOrderHere;
