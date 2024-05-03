import React from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const AlamatCard = ({ provinsi, kabupaten, kelurahan, detailAlamat, kodePos }) => {
    return (
        <Card className="h-full w-full border border-gray-200 shadow-md rounded-lg">
            <CardBody className="px-6 py-4">
                <Typography variant="h5" color="gray-900" className="mb-2">
                    Alamat Pengiriman
                </Typography>
                <hr className="my-2" />
                <div className="flex flex-col space-y-2 mt-4">
                    <Typography variant="body" color="gray-600">
                        <span className="font-bold">Provinsi:</span> {provinsi}
                    </Typography>
                    <Typography variant="body" color="gray-600">
                        <span className="font-bold">Kabupaten/Kota:</span> {kabupaten}
                    </Typography>
                    <Typography variant="body" color="gray-600">
                        <span className="font-bold">Kelurahan/Desa:</span> {kelurahan}
                    </Typography>
                    <Typography variant="body" color="gray-600">
                        <span className="font-bold">Detail Alamat:</span> {detailAlamat}
                    </Typography>
                    <Typography variant="body" color="gray-600">
                        <span className="font-bold">Kode Pos:</span> {kodePos}
                    </Typography>
                </div>
            </CardBody>
        </Card>
    );
}

const AlamatCardPage = () => {
    const alamat = [
        {
            provinsi: "Bali",
            kabupaten: "Singaraja",
            kelurahan: "Banyualit",
            detailAlamat: "Jl. Sudirman No. 10",
            kodePos: "81113"
        },
        {
            provinsi: "Jawa Timur",
            kabupaten: "Surabaya",
            kelurahan: "Wonokromo",
            detailAlamat: "Jl. Panglima Sudirman No. 20",
            kodePos: "60241"
        },
        {
            provinsi: "DKI Jakarta",
            kabupaten: "Jakarta Selatan",
            kelurahan: "Kebayoran Baru",
            detailAlamat: "Jl. Suryo No. 15",
            kodePos: "12120"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {alamat.map((item, index) => (
                <AlamatCard
                    key={index}
                    provinsi={item.provinsi}
                    kabupaten={item.kabupaten}
                    kelurahan={item.kelurahan}
                    detailAlamat={item.detailAlamat}
                    kodePos={item.kodePos}
                />
            ))}
        </div>
    );
}

export default AlamatCardPage;
