import React, { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";
import { storeBahanBaku } from "../../../api/admin/BahanBakuApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const AddBahanBaku = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const [data, setData] = useState({
        nama_bahan_baku: "",
        satuan_bahan_baku: "",
        stok_bahan_baku: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        storeBahanBaku(formData)
        .then((res) => {
            console.log("sini")
            toast.success("Data Bahan Baku berhasil diubah"); 
            setTimeout(() => {// Delay selama 2 detik
                navigate("/admin/bahanBaku/read")
            }, 2000);
        })
        .catch((err) => {
            console.log("Error", err);
            toast.error("Terjadi kesalahan saat mengubah data Bahan Baku");
        });
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
                                <label htmlFor="nama_bahan_baku" className=" block mb-2 text-sm font-medium text-gray-900">Nama Bahan Baku</label>
                                <Input
                                    id="nama_bahan_baku"
                                    name="nama_bahan_baku"
                                    onChange={setFormData}
                                    type='text'
                                    size="md"
                                    label="Nama Bahan Baku"
                                    className=' w-sm'
                                    placeholder='Keju'
                                    required
                                />

                            </div>
                            {/* <div className="mb-2 relative w-full min-w-[100px] h-10]">
                                <label htmlFor="stok_bahan_baku" className=" block mb-2 text-sm font-medium text-gray-900">Jumlah Bahan</label>
                                <Input
                                    id="stok_bahan_baku"
                                    name="stok_bahan_baku"
                                    onChange={setFormData}
                                    type='number'
                                    size="md"
                                    label="Jumlah Bahan Baku"
                                    className=' w-sm'
                                    placeholder='100'
                                    required
                                />

                            </div> */}
                            <div className="mb-2 relative w-full min-w-[100px] h-10">
                                <label htmlFor="satuan_bahan_baku" className="block mb-2 text-sm font-medium text-gray-900">Satuan Bahan</label>
                                <select
                                    id="satuan_bahan_baku"
                                    name="satuan_bahan_baku"
                                    onChange={setFormData}
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                    required
                                >
                                    <option value="">Pilih Satuan Bahan</option>
                                    <option value="gr">gr</option>
                                    <option value="ml">ml</option>
                                    <option value="Buah">Buah</option>
                                    {/* Tambahkan opsi-opsi lain sesuai kebutuhan */}
                                </select>
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
            <ToastContainer/>
        </div>
    );
};

export default AddBahanBaku;
