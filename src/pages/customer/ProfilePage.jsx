import React, { useState, useEffect } from "react";
import NavbarLogin from "../../components/NavbarLogin";
import FooterUser from "../../components/Footer";
import {
    Tabs,
    TabsHeader,
    Tab,
    Typography,
    Button,
} from "@material-tailwind/react";
import {
    ShoppingCartIcon,
    BellIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import HistoryCardPage from "../../components/HistoryCard";
import AlamatCardPage from "../../components/AlamatCard";
import { Link, useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import { showDataCustomer } from "../../api/customer/customerApi";

const NAVS = [
    {
        label: "Pesanan Saya",
        value: "Pesanan Saya",
        icon: ShoppingCartIcon,
    },
    {
        label: "Pemberitahuan",
        value: "Pemberitahuan",
        icon: BellIcon,
    },
    {
        label: "Alamat Saya",
        value: "Alamat Saya",
        icon: MapPinIcon,
    },
];

const ProfilePage = () => {
    let { id } = useParams();
    console.log("masukparams", id)
    const [activeItem, setActiveItem] = useState(null);
    const [content, setContent] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Semua");

    useEffect(() => {
        setLoading(true);
        showDataCustomer().then((res) => {
            
            console.log("roger1", res.data.id);
            setUserData(res.data);
            sessionStorage.setItem('userData', JSON.stringify(res.data));
        }).catch((err) => {
            console.error("Error fetching user data:", err);
            setLoading(true);
        });
    }, []);

    const handleItemClick = (item) => {
        setActiveItem(item);
        if (item === "Pesanan Saya") {
            setContent(<HistoryCardPage />);
        } else if (item === "Alamat Saya") {
            setContent(<AlamatCardPage />);
        } else {
            setContent(null);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarLogin />
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
                            <Typography variant="h5" className="text-center md:text-center lg:text-left">{userData?.nama_user}</Typography>
                            <Typography variant="paragraph" className="mb-3 text-center md:text-center lg:text-left">{userData?.username}</Typography>
                            <div className="flex justify-center lg:justify-start">
                                <Link to={`/customer/profile/edit/${id}`}>
                                    <Button color="black" ripple="light">
                                        <div className="flex justify-center items-center">
                                            <FontAwesomeIcon icon={faPenSquare} className="h-5 w-5 " />
                                            <span className="ml-2">Edit</span>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-1 pr-3 md:order-2 lg:order-1 ">
                            <Typography variant="h6" className="text-center md:text-start">Rp {userData?.pelanggan.atma_wallet}</Typography>
                            <Typography variant="paragraph" className="text-center md:text-start">Poin : {userData?.pelanggan.poin}</Typography>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:order-2 lg:col-span-1 gap-2 ">
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Email</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph" className="">{userData?.email}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Gender</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{userData?.gender}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Tanggal Lahir</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{userData?.tanggal_lahir}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Nomor Telepon</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{userData?.nomor_telepon}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Bank</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{userData?.pelanggan.bank}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m-3 flex mb-16">
                <div className="hidden lg:block">
                    <SideNav activeItem={activeItem} handleItemClick={handleItemClick} />
                </div>
                <div className="ml-3 w-full rounded-lg bg-transparent mb-2">
                    <div className="lg:hidden">
                        <Tabs
                            value={selectedTab}
                            className="w-full flex overflow-x-auto"
                        >
                            <TabsHeader>
                                {NAVS.map(({ label, value, icon: Icon }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        active={selectedTab === value}
                                        onClick={() => {
                                            setSelectedTab(value);
                                            handleItemClick(value);
                                        }}
                                        className="flex items-center justify-center min-w-[160px] lg:min-w-[200px] p-2"
                                    >
                                        <Icon className="h-6 w-6 mr-1 inline-block" />
                                        {label}
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                    </div>
                    {content && (
                        <div className="w-full h-full rounded-lg bg-transparent">
                            {content}
                        </div>
                    )}
                </div>

            </div >
            <FooterUser />
        </div>
    );
};

export default ProfilePage;
