import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";
import { BahanBakuSchema } from "../../../validations/BahanBakuSchema";


const AddBahanBaku = () => {
    const [formData, setFormData] = useState({
    namaBahanBaku: "",
    jumlahBahan: "",
    satuan: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
    };

    const handleSubmit = (e) => {
        
        e.preventDefault();
        const formData = new formData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
        const parsedBahanBaku = BahanBakuSchema.safeParse(formDataObject);
        if (!parsedBahanBaku.success) {
            
            const error = parsedBahanBaku.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            setFormErrors(newErrors);
            return;
        }
        console.log("formData", formData);
        setFormErrors({});
        // TODO: Kirim data ke server
    };
    

    return (
        <div className="mt-12 mb-8">
            <Card>
            <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                <Typography variant="h6" color="white">
                Tambah Bahan Baku
                </Typography>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="mb-2 relative w-full min-w-[100px] h-10]">
                    <label htmlFor="namaBahanBaku" className=" block mb-2 text-sm font-medium text-gray-900">Nama Bahan Baku</label>
                    <Input
                        id="namaBahanBaku"
                        name="namaBahanBaku"
                        value={formData.namaBahanBaku}
                        onChange={handleChange}
                        type='text'
                        size="md"
                        label="Nama Bahan Baku"
                        className=' w-sm'
                        placeholder='Keju'
                        required
                    />
                    <div className="text-red-500 text-xs mt-1">{formErrors.namaBahanBaku}</div>
                </div>
                <div className="mb-2 relative w-full min-w-[100px] h-10]">
                    <label htmlFor="jumlahBahan" className=" block mb-2 text-sm font-medium text-gray-900">Jumlah Bahan</label>
                    <Input
                        id="jumlahBahan"
                        name="jumlahBahan"
                        value={formData.jumlahBahan}
                        onChange={handleChange}
                        type='number'
                        size="md"
                        label="Jumlah Bahan Baku"
                        className=' w-sm'
                        placeholder='100'
                        required
                    />
                    <div className="text-red-500 text-xs mt-1">{formErrors.jumlahBahan}</div>
                </div>
                <div className="mb-2 relative w-full min-w-[100px] h-10">
                    <label htmlFor="satuanBahanBaku" className="block mb-2 text-sm font-medium text-gray-900">Satuan Bahan</label>
                    <select
                        id="satuanBahanBaku"
                        name="satuan"
                        value={formData.satuan}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                        required
                    >
                        <option value="">Pilih Satuan Bahan</option>
                        <option value="gr">gr</option>
                        <option value="ml">ml</option>
                        <option value="Buah">Buah</option>
                        {/* Tambahkan opsi-opsi lain sesuai kebutuhan */}
                    </select>
                    <div className="text-red-500 text-xs mt-1">{formErrors.satuan}</div>
                </div>

                </div>
                <div className="mt-10 flex justify-end">
                <Link to="/admin/bahanBaku/read">
                    <button
                        type="cancel"
                        className="inline-flex items-center px-4 py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                    <FontAwesomeIcon icon={faClose} className="mr-2" /> Batal
                    </button>
                </Link>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                    <FontAwesomeIcon icon={faSave} className="mr-2" /> Simpan
                    </button>
                </div>
                </form>
            </CardBody>
            </Card>
        </div>
    );
};

export default AddBahanBaku;
