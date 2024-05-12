import React, { useState, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";
import { storePegawai } from "../../../api/mo/PegawaiApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const AddPegawai = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        nama: "",
        email: "",
        jenisKelamin: "",
        tanggalLahir: "",
        NoTelepon: "",
        gaji: 0,
        bonus: 0,
    });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission here
        storePegawai(formData)
            .then((res) => {
                sessionStorage.setItem("dataPegawai", JSON.stringify(res.data));
                toast.success("Data Pegawai berhasil ditambah"); 
                setTimeout(() => {// Delay selama 2 detik
                    navigate("/mo/pegawai/read")
                }, 2000);
            })
            .catch((err) => {
                toast.error("Terjadi kesalahan saat mengubah data penitip");
                console.log("Error", err);
            })
    };

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">
                        Tambah Pegawai
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 relative w-full min-w-[100px]">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <Input
                                    id="username"
                                    name="username"
                                    onChange={setFormData}
                                    type='text'
                                    size="md"
                                    label="Username"
                                    placeholder='Pakde Raihan'
                                    required
                                />
                            </div>
                            <div className="mb-4 col-span-1 relative w-full min-w-[100px]">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <Input
                                    id="password"
                                    name="password"
                                    onChange={setFormData}
                                    type='password'
                                    size="md"
                                    label="Password"
                                    placeholder='Pakde Raihan'
                                    required
                                />
                            </div>
                            <div className="mb-4 col-span-1  relative w-full min-w-[100px]">
                                <label htmlFor="nama_user" className="block mb-2 text-sm font-medium text-gray-900">Nama Pegawai</label>
                                <Input
                                    id="nama_user"
                                    name="nama_user"
                                    onChange={setFormData}
                                    type='text'
                                    size="md"
                                    label="Nama Pegawai"
                                    placeholder='Kang Saun'
                                    required
                                />
                            </div>
                            <div className="mb-4 col-span-1 relative w-full min-w-[100px]">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <Input
                                    id="email"
                                    name="email"
                                    onChange={setFormData}
                                    type='email'
                                    size="md"
                                    label="Email"
                                    placeholder='RaihanSukaDia@example.com'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="tanggal_lahir" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                <Input
                                    id="tanggal_lahir"
                                    name="tanggal_lahir"
                                    onChange={setFormData}
                                    type='date'
                                    size="md"
                                    label="Tanggal Lahir"
                                    placeholder='100'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    onChange={setFormData}
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                    required
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="Laki-Laki">Laki-Laki</option>
                                    <option value="Perempuan">Perempuan</option>

                                </select>
                            </div>

                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="nomor_telepon" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
                                <Input
                                    id="nomor_telepon"
                                    name="nomor_telepon"
                                    onChange={setFormData}
                                    type='number'
                                    size="md"
                                    label="Nomor Telepon"
                                    placeholder='082635272536'
                                    required
                                />
                            </div>

                        </div>
                        <div className="mt-10 flex justify-end">
                            <Link to="/mo/pegawai/read">
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

export default AddPegawai;