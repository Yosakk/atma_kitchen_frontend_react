import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddHampers = () => {
    const [formData, setFormData] = useState({
        namaProduk: "",
        gambarProduk: "",
        deskripsiProduk: "",
        hargaProduk: "",
        
    });
    const [produkList, setProdukList] = useState([{ namaProduk: '' }]);

const handleAddProduk = () => {
    setProdukList([...produkList, { namaProduk: '' }]);
};

const handleRemoveProduk = (index) => {
    const updatedProdukList = [...produkList];
    updatedProdukList.splice(index, 1);
    setProdukList(updatedProdukList);
};



    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedProdukList = [...produkList];
        updatedProdukList[index] = { ...updatedProdukList[index], [name]: value };
        setProdukList(updatedProdukList);
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
                        Tambah Hampers
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 md:col-span-2  lg:col-span-2 relative w-full min-w-[100px]">
                                <label htmlFor="namaProduk" className="block mb-2 text-sm font-medium text-gray-900">Nama Paket Hampers</label>
                                <Input
                                    id="namaProduk"
                                    name="namaProduk"
                                    value={formData.namaProduk}
                                    onChange={handleChange}
                                    type='text'
                                    size="md"
                                    label="Nama Paket Hampers"
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
                            {produkList.map((produk, index) => (
                                <div key={index} className="col-span-1  mb-4">
                                    <label htmlFor={`namaProduk_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Nama Produk {index + 1}</label>
                                    <select
                                        required
                                        name={`namaProduk_${index}`}
                                        id={`namaProduk_${index}`}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                        placeholder={`Nama Produk ${index + 1}`}
                                        style={{ width: '100%' }}
                                        onChange={setFormData}
                                        
                                    >
                                        <option value="Produk A" disabled >Pilih Nama Produk {index + 1} </option>
                                        <option value="Produk A">Produk A</option>
                                        <option value="Produk B">Produk B</option>
                                        <option value="Produk C">Produk C</option>
                                    </select>
                                    
                                </div>
                            ))}

                        </div>
                        <div className="mt-10 flex justify-between">
                            <div>
                                <Button type="button" onClick={() => handleRemoveProduk(produkList.length - 1)}  disabled={produkList.length <= 1}className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faTrash} /> Hapus Produk
                                </Button>
                                <Button type="button" onClick={handleAddProduk} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Produk
                                </Button>
                            </div>

                            <div>
                                <Link className="mb-2" to="/admin/produk/read">
                                    <Button
                                        type="cancel"
                                        className="mb-2 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0"
                                    >
                                        <FontAwesomeIcon icon={faClose} className="mr-2" /> Batal
                                    </Button>
                                </Link>
                                
                                <Button
                                    type="submit"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0"
                                >
                                    <FontAwesomeIcon icon={faSave} className="" /> Simpan
                                </Button>
                            </div>
                        </div>

                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default AddHampers;