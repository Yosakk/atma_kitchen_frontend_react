import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";

const EditPenitip = () => {
    const [formData, setFormData] = useState({
        nama: "", 
        NoTelepon: "",
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
        // Add your logic to handle form submission here
        console.log(formData);
        };

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">
                        Ubah Penitip
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 md:col-span-2 relative w-full min-w-[100px]">
                                <label htmlFor="namaPegawai" className="block mb-2 text-sm font-medium text-gray-900">Nama Pegawai</label>
                                <Input
                                    id="namaPegawai"
                                    name="namaPegawai"
                                    value={formData.namaPegawai}
                                    onChange={handleChange}
                                    type='text'
                                    size="md"
                                    label="Nama Pegawai"
                                    placeholder='Kang Saun'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="NoTelepon" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
                                <Input
                                    id="NoTelepon"
                                    name="NoTelepon"
                                    value={formData.NoTelepon}
                                    onChange={handleChange}
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

export default EditPenitip;