import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";

const AddProduk = () => {
    const [formData, setFormData] = useState({
        namaProduk: "",
        gambarProduk: "",
        deskripsiProduk: "",
        hargaProduk: "",
        kategoriProduk: "",
        statusProduk: "",
        kuantitas: 0,
        namaPenitip: "",
        stokProdukTitipan: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "kategoriProduk" && value !== "Titipan") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                namaPenitip: "",
                stokProdukTitipan: "",
                [name]: value,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
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
                        Tambah Produk
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 md:col-span-2  lg:col-span-2 relative w-full min-w-[100px]">
                                <label htmlFor="namaProduk" className="block mb-2 text-sm font-medium text-gray-900">Nama Produk</label>
                                <Input
                                    id="namaProduk"
                                    name="namaProduk"
                                    value={formData.namaProduk}
                                    onChange={handleChange}
                                    type='text'
                                    size="md"
                                    label="Nama Produk"
                                    placeholder='Lapis Legit'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="hargaProduk" className="block mb-2 text-sm font-medium text-gray-900">Harga Produk</label>
                                <Input
                                    id="hargaProduk"
                                    name="hargaProduk"
                                    value={formData.hargaProduk}
                                    onChange={handleChange}
                                    type='number'
                                    size="md"
                                    label="Harga Produk"
                                    placeholder='100'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="kategoriProduk" className="block mb-2 text-sm font-medium text-gray-900">Kategori Produk</label>
                                <select
                                    id="kategoriProduk"
                                    name="kategoriProduk"
                                    value={formData.kategoriProduk}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                    required
                                >
                                    <option value="">Pilih Kategori Produk</option>
                                    <option value="Cake">Cake</option>
                                    <option value="Roti">Roti</option>
                                    <option value="Minuman">Minuman</option>
                                    <option value="Titipan">Titipan</option>
                                </select>
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="kuantitas" className="block mb-2 text-sm font-medium text-gray-900">Kuantitas</label>
                                <select
                                    id="kuantitas"
                                    name="kuantitas"
                                    value={formData.kuantitas}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                    required
                                >
                                    <option value="1">1</option>
                                    <option value="0.5">0.5</option>
                                </select>
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="gambarProduk" className="block mb-2 text-sm font-medium text-gray-900">Gambar Produk</label>
                                <Input
                                    id="gambarProduk"
                                    name="gambarProduk"
                                    value={formData.gambarProduk}
                                    onChange={handleChange}
                                    type='file'
                                    size="md"
                                    label="Gambar Produk"
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="limitHarianProduk" className="block mb-2 text-sm font-medium text-gray-900">Limit Harian Produk</label>
                                <Input
                                    id="limitHarianProduk"
                                    name="limitHarianProduk"
                                    value={formData.limitHarianProduk}
                                    onChange={handleChange}
                                    type='number'
                                    size="md"
                                    label="Limit Harian Produk"
                                    disabled={formData.kategoriProduk === "Titipan"}
                                    placeholder='10'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="namaPenitip" className="block mb-2 text-sm font-medium text-gray-900">Nama Penitip</label>
                                <select
                                    id="namaPenitip"
                                    name="namaPenitip"
                                    value={formData.namaPenitip}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                    disabled={formData.kategoriProduk !== "Titipan"}
                                    required
                                >
                                    <option value="">Pilih Nama Penitip</option>
                                    <option value="Kang Saun">Kang Saun</option>
                                    <option value="Cak Candra">Cak Candra</option>
                                    <option value="Pak De Raihan">Pak De Raihan</option>
                                    <option value="Tio Platipus">Tio Platipus</option>
                                </select>
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="stokProdukTitipan" className="block mb-2 text-sm font-medium text-gray-900">Stok Produk Titipan</label>
                                <Input
                                    id="stokProdukTitipan"
                                    name="stokProdukTitipan"
                                    value={formData.stokProdukTitipan}
                                    onChange={handleChange}
                                    type='number'
                                    size="md"
                                    label="Stok Produk Titipan"
                                    className=' w-sm'
                                    placeholder='10'
                                    disabled={formData.kategoriProduk !== "Titipan"}
                                    required
                                />
                            </div>
                            <div className="mb-4 col-span-1 md:col-span-2 lg:col-span-3 relative w-full min-w-[100px]">
                                <label htmlFor="deskripsiProduk" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi Produk</label>
                                <Textarea
                                    id="deskripsiProduk"
                                    name="deskripsiProduk"
                                    value={formData.deskripsiProduk}
                                    onChange={handleChange}
                                    type='text'
                                    size="md"
                                    // placeholder='Kue Lapis Legit merupakan makanan khas'
                                    label="Deskripsi Produk"
                                    required
                                />
                            </div>

                        </div>
                        <div className="mt-10 flex justify-end">
                            <Link to="/admin/produk/read">
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

export default AddProduk;