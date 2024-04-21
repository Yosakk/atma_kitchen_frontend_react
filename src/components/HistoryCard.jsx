import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

const TABS = [
    {
        label: "Semua",
        value: "semua",
    },
    {
        label: "Diproses",
        value: "diproses",
    },
    {
        label: "Dikirim",
        value: "dikirim",
    },
    {
        label: "Selesai",
        value: "selesai",
    },
];

const HistoryCard = () => {
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
                    <Tabs value="all" className="w-full md:w-max overflow-x-auto">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
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
                <div className="border p-3 rounded-lg">
                    <div className="flex pb-3">
                        <Typography variant="h6" color="black">
                            Tanggal Transaksi : 21/12/2002
                        </Typography>
                        <Typography variant="h6" color="black" className="ml-auto">
                            <Chip
                                size="sm"
                                variant="ghost"
                                value={"Siap di Pickup"}
                                color={
                                    status === "Cake"
                                        ? "green"
                                        : status === "Roti"
                                            ? "amber"
                                            : status === "Minuman"
                                                ? "blue"
                                                : status === "Titipan"
                                                    ? "purple"
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
                                Kue Lapis Legit 1 Loyang
                            </Typography>
                            <Typography>
                                Kue Lapis Legit dengan kenikmatan tiada tanding
                            </Typography>
                            <div className="w-max mt-2">
                                <Chip
                                    size="sm"
                                    variant="ghost"
                                    value={"Cake"}
                                    color={
                                        status === "Cake"
                                            ? "green"
                                            : status === "Roti"
                                                ? "amber"
                                                : status === "Minuman"
                                                    ? "blue"
                                                    : status === "Titipan"
                                                        ? "purple"
                                                        : "red"
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-end col-span-6 md:col-span-2">
                            <Typography variant="paragraph" color="blue-gray" className="mb-2  flex items-center">
                                Rp 200.000
                            </Typography>
                        </div>


                    </div>
                    <div className="flex justify-end">
                        <Typography variant="paragraph" color="blue-gray" className="mb-2 col-span-2 flex justify-center items-center">
                            Total :
                        </Typography>
                        <Typography variant="lead" color="blue-gray" className="mb-2 col-span-2 flex ml-2">
                            120.000
                        </Typography>
                    </div>

                </div>

            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default HistoryCard