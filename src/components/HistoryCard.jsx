import React, { useState } from "react";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Chip,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const TABS = [
    {
        label: "Semua",
        value: "Semua",
    },
    {
        label: "Diproses",
        value: "Diproses",
    },
    {
        label: "Dikirim",
        value: "Dikirim",
    },
    {
        label: "Selesai",
        value: "Selesai",
    },
];

const DATA = [
    {
        tanggal: "21/12/2002",
        status: "Diproses",
        namaProduk: "Kue Lapis Legit 1 Loyang",
        deskripsi: "Kue Lapis Legit dengan kenikmatan tiada tanding",
        kategori: "Cake",
        harga: 200000,
        total: 120000,
    },
    {
        tanggal: "22/12/2002",
        status: "Selesai",
        namaProduk: "Roti Sobek 1 Papan",
        deskripsi: "Roti Sobek dengan rasa yang menggugah selera",
        kategori: "Roti",
        harga: 150000,
        total: 100000,
    },
    {
        tanggal: "26/12/2002",
        status: "Dikirim",
        namaProduk: "Macha Creamy Latte",
        deskripsi: "Macha Creamy Latte dengan rasa yang menggugah selera",
        kategori: "Minuman",
        harga: 150000,
        total: 100000,
    },
    {
        tanggal: "26/12/2002",
        status: "Dikirim",
        namaProduk: "Roti Sobek 1 Papan",
        deskripsi: "Roti Sobek dengan rasa yang menggugah selera",
        kategori: "Roti",
        harga: 150000,
        total: 100000,
    },
    {
        tanggal: "22/12/2002",
        status: "Selesai",
        namaProduk: "Coffe Creamy Latte ",
        deskripsi: "Coffe Creamy Latte dengan rasa yang menggugah selera",
        kategori: "Minuman",
        harga: 150000,
        total: 100000,
    },
    {
        tanggal: "26/12/2002",
        status: "Dikirim",
        namaProduk: "Lapis Surabaya",
        deskripsi: "Lapis Surabaya dengan rasa yang menggugah selera",
        kategori: "Cake",
        harga: 150000,
        total: 100000,
    },
    {
        tanggal: "26/12/2002",
        status: "Dikirim",
        namaProduk: "Brownies 1 Papan",
        deskripsi: "Brownies dengan rasa yang menggugah selera",
        kategori: "Roti",
        harga: 150000,
        total: 100000,
    },
    
    // Add more data here...
];

const HistoryCard = () => {
    const [selectedTab, setSelectedTab] = useState("Semua");

    const filteredData = selectedTab === "Semua" ? DATA : DATA.filter(item => item.status === selectedTab);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Ubah sesuai dengan jumlah item yang ingin ditampilkan per halaman

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleClickPrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleClickNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    // Filtered data based on pagination
    const paginatedData = filteredData.slice(startIndex, endIndex);
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Riwayat Pemesanan
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Lihat semua pemesanan Anda
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
                    <Tabs value={selectedTab} className="w-full md:w-max overflow-x-auto">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    active={selectedTab === value}
                                    onClick={() => setSelectedTab(value)}
                                >
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>

            <CardBody className="px-4">
                {paginatedData.map((item, index) => (
                    <div key={index} className="border p-3 rounded-lg mb-4">
                        <div className="flex pb-3">
                            <Typography variant="h6" color="black">
                                Tanggal Transaksi : {item.tanggal}
                            </Typography>
                            <Typography variant="h6" color="black" className="ml-auto">
                                <Chip
                                    size="sm"
                                    variant="ghost"
                                    value={item.status}
                                    color={
                                        item.status === "Selesai"
                                            ? "green"
                                            : item.status === "Dikirim"
                                                ? "amber"
                                                : item.status === "Diproses"
                                                    ? "blue"
                                                    : "red"
                                    }
                                />
                            </Typography>
                        </div>
                        <div className="grid grid-cols-6 border-b border-t pt-4 pb-4">
                            <div className="mx-auto col-span-3 md:col-span-1 flex justify-center items-center">
                                <img
                                    src="https://docs.material-tailwind.com/img/face-2.jpg"
                                    alt="avatar"
                                    className="inline-block h-[120px] w-[120px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] object-cover object-center"
                                />
                            </div>
                            <div className="col-span-3">
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {item.namaProduk}
                                </Typography>
                                <Typography>
                                    {item.deskripsi}
                                </Typography>
                                <div className="w-max mt-2">
                                    <Chip
                                        size="sm"
                                        variant="ghost"
                                        value={item.kategori}
                                        color={
                                            item.kategori === "Cake"
                                                ? "green"
                                                : item.kategori === "Roti"
                                                    ? "amber"
                                                    : item.kategori === "Minuman"
                                                        ? "blue"
                                                        : item.kategori === "Titipan"
                                                            ? "purple"
                                                            : "red"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end col-span-6 md:col-span-2">
                                <Typography variant="paragraph" color="blue-gray" className="mb-2  flex items-center">
                                    Rp {item.harga}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Typography variant="paragraph" color="blue-gray" className="mb-2 col-span-2 flex justify-center items-center">
                                Total : {item.total}
                            </Typography>
                        </div>
                    </div>
                ))}
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
    <Typography variant="small" color="blue-gray" className="font-normal">
        Page {currentPage} of {totalPages}
    </Typography>
    <div className="flex gap-2">
        <Button variant="outlined" size="sm" onClick={handleClickPrevious} disabled={currentPage === 1}>
            Previous
        </Button>
        <Button variant="outlined" size="sm" onClick={handleClickNext} disabled={currentPage === totalPages}>
            Next
        </Button>
    </div>
</CardFooter>
        </Card>
    );
}

export default HistoryCard;
