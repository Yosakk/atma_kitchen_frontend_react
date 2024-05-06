// import NavbarLogin from "../../components/NavbarLogin";
// import FooterUser from "../../components/Footer";
import { Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
// import SideNav from "../../components/SideNav";
import HistoryCardPelanggan from "../pelanggan/HistoryCardPelanggan";
import { Link, useParams } from "react-router-dom";
import { Sidenav } from "../../../widgets/layout";
import React, { useState, useEffect } from "react";
import { showCustomerByAdmin } from "../../../api/admin/PelangganApi";

const ProfilePagePelanggan = () => {
    let { id } = useParams();
    console.log("masuk", id)
    const [pelangganData, setPelangganData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPelangganId, setSelectedPelangganId] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await showCustomerByAdmin(id);
            setPelangganData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    console.log("masuk", id)
    console.log("coba nama", pelangganData.nama_user)

    return (
        <div className="flex flex-col min-h-screen">
            {/* <NavbarLogin /> */}
            <div className="flex-grow flex justify-center">
                <div className="border w-full  m-10 p-2 pt-6 pb-6 rounded-lg bg-white shadow-md " >
                    <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5">
                        <div className="flex justify-center items-center md:row-span-2 ">
                            <img
                                src="https://docs.material-tailwind.com/img/face-2.jpg"
                                alt="avatar"
                                className="relative inline-block h-[210px] w-[210px] md:w-[180px] md:h-[180px] lg:w-[150px] lg:h-[150px] rounded-full object-cover object-center"
                            />
                        </div>
                        <div className="md:col-span-1 md:order-3 lg:order-1 lg:col-span-1 mb-3 md:mx-auto sm:mx-auto">
                            <Typography variant="h5" className="text-center md:text-center lg:text-left">{pelangganData.nama_user}</Typography>
                            <Typography variant="paragraph" className="mb-3 text-center md:text-center lg:text-left">{pelangganData.username}</Typography>
                            <div className="flex justify-center lg:justify-start">
                                <Link to="/customer/profile/edit" className="flex items-center gap-3 text-black rounded bg-black text-white font-bold py-2 px-4 transition-colors duration-300 hover:bg-black hover:text-yellow-300">
                                    <FontAwesomeIcon icon={faPenSquare} className="h-5 w-5 " />
                                    Edit
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-1 pr-3 md:order-2 lg:order-1 ">
                            <Typography variant="h6" className="text-center md:text-start">Rp {pelangganData.pelanggan ? pelangganData.pelanggan.atma_wallet : null}</Typography>
                            <Typography variant="paragraph" className="text-center md:text-start">Poin : {pelangganData.pelanggan ? pelangganData.pelanggan.poin : null}</Typography>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:order-2 lg:col-span-1 gap-2 ">
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Email</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph" className="">{pelangganData.email}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Gender</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{pelangganData.gender}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Tanggal Lahir</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{pelangganData.tanggal_lahir}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Nomor Telepon</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{pelangganData.nomor_telepon}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Bank</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{pelangganData.pelanggan ? pelangganData.pelanggan.bank : null}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-3 flex">
                {/* <div className="hidden lg:block">
                    <Sidenav />
                </div> */}
                <div className="ml-3 w-full rounded-lg bg-transparent ">
                    <div>
                        <HistoryCardPelanggan />
                    </div>
                </div>
            </div>
            {/* <FooterUser /> */}
        </div>
    );
}

export default ProfilePagePelanggan;
