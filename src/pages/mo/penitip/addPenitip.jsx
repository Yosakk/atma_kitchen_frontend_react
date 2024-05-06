import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";
import { storeDataPenitip } from "../../../api/mo/PenitipApi";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const AddPenitip = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [data, setData] = useState({
        nama_penitip: "",
        nomor_telepon_penitip: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        storeDataPenitip(formData)
            .then((res) => {
                console.log("sini")
            })
            .catch((err) => {
                console.log("Error", err);
            })
    };

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">
                        Tambah Penitip
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 md:col-span-2 relative w-full min-w-[100px]">
                                <label htmlFor="nama_penitip" className="block mb-2 text-sm font-medium text-gray-900">Nama Penitip</label>
                                <Input
                                    id="nama_penitip"
                                    name="nama_penitip"
                                    onChange={setFormData}
                                    type='text'
                                    size="md"
                                    label="Nama Penitip"
                                    placeholder='Kang Saun'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="nomor_telepon_penitip" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
                                <Input
                                    id="nomor_telepon_penitip"
                                    name="nomor_telepon_penitip"
                                    onChange={setFormData}
                                    type='number'
                                    size="md"
                                    label="Nomor Telepon"
                                    // disabled={formData.kategoriProduk === "Titipan"}
                                    placeholder='082635272536'
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-10 flex justify-end">
                            <Link to="/mo/penitip/read">
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

export default AddPenitip;