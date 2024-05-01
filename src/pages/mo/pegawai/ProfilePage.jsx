import React, { useState } from "react";
import { Typography, Button, Card, CardHeader, CardBody, Input, Select } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faClose, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProfilePagePegawai = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "Gede Pandu Prayaksa",
        namaPegawai: "Pakde Raihan",
        email: "RaihanSukaDia@example.com",
        jenisKelamin: "Laki-Laki",
        tanggalLahir: "2003-12-21",
        NoTelepon: "082635272536",
        gaji: 1000000,
        bonusGaji:100000,
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission here
        console.log(formData);
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col">
            <div className="flex-grow flex justify-center">
            <div className={`border w-full m-5 p-2 pt-6 pb-6 rounded-lg bg-white shadow-md ${isEditing ? 'md:min-h-[300px] lg:min-h-[400px]' : 'md:min-h-[300px] lg:min-h-[400px]'}`}>

                    <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-5">
                        <div className="flex justify-center items-center md:row-span-2 ">
                            <img
                                src="https://docs.material-tailwind.com/img/face-2.jpg"
                                alt="avatar"
                                className="relative inline-block h-[210px] w-[210px] md:w-[180px] md:h-[180px] lg:w-[150px] lg:h-[150px] rounded-full object-cover object-center"
                            />
                        </div>
                        <div className="md:col-span-1 md:order-3 lg:order-1 lg:col-span-1 mb-3 md:mx-auto sm:mx-auto">
                            <Typography variant="h5" className="text-center md:text-center lg:text-left">{formData.namaPegawai}</Typography>
                            <Typography variant="paragraph" className="mb-3 text-center md:text-center lg:text-left">{formData.username}</Typography>
                            <div className="flex justify-center lg:justify-start">
                                <Button
                                    color="blue"
                                    size="sm"
                                    onClick={handleEditClick}
                                >
                                    <FontAwesomeIcon icon={faPenSquare} className="h-5 w-5 mr-2" />
                                    Edit
                                </Button>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-1 pr-3 md:order-2 lg:order-1 ">
                            <Typography variant="h6" className="text-center md:text-start"></Typography>
                            <Typography variant="paragraph" className="text-center md:text-start"></Typography>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:order-2 lg:col-span-1 gap-2 ">
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2 mb-4 col-span-1 md:col-span-2 md:text-sm relative w-full min-w-[100px]">
                                <Typography variant="h6">Email</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph" className="">{formData.email}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Jenis Kelamin</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{formData.jenisKelamin}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Tanggal Lahir</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <Typography variant="paragraph">{formData.tanggalLahir}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Nomor Telepon</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">{formData.NoTelepon}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Gaji</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">Rp.{formData.gaji}</Typography>
                            </div>
                            <div className="flex justify-between gap-4 col-span-1 md:col-span-2">
                                <Typography variant="h6">Bonus Gaji</Typography>
                                <Typography variant="paragraph">:</Typography>
                            </div>
                            <div className="">
                                <Typography variant="paragraph">Rp.{formData.bonusGaji}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isEditing && (
                <div className="m-3 flex">
                    <div className="ml-3 w-full rounded-lg bg-transparent ">
                        <Card>
                            <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                                <Typography variant="h6" color="white">
                                    Edit Profile
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
                                                value={formData.username}
                                                onChange={handleChange}
                                                type='text'
                                                size="md"
                                                label="Username"
                                                placeholder='Pakde Raihan'
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 col-span-1  relative w-full min-w-[100px]">
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
                                        <div className="mb-4 col-span-1 relative w-full min-w-[100px]">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                            <Input
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                type='email'
                                                size="md"
                                                label="Email"
                                                placeholder='RaihanSukaDia@example.com'
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 relative w-full min-w-[100px]">
                                            <label htmlFor="tanggalLahir" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Lahir</label>
                                            <Input
                                                id="tanggalLahir"
                                                name="tanggalLahir"
                                                value={formData.tanggalLahir}
                                                onChange={handleChange}
                                                type='date'
                                                size="md"
                                                label="Tanggal Lahir"
                                                placeholder='100'
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 relative w-full min-w-[100px]">
                                            <label htmlFor="jenisKelamin" className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin</label>
                                            <select
                                                id="jenisKelamin"
                                                name="jenisKelamin"
                                                value={formData.jenisKelamin}
                                                onChange={handleChange}
                                                className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                                required
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="Laki-Laki">Laki-Laki</option>
                                                <option value="Perempuan">Perempuan</option>

                                            </select>
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
                                        <button
                                            type="button"
                                            onClick={handleCancelClick}
                                            className="inline-flex items-center px-4 py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            <FontAwesomeIcon icon={faClose} className="mr-2" /> Batal
                                        </button>
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
                </div>
            )}
        </div>
    );
}

export default ProfilePagePegawai;
