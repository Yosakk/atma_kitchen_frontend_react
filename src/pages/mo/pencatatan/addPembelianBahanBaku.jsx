import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddPembelianBahanBaku = () => {
    const [formData, setFormData] = useState({
        namaBahanBaku: "",
        jumlahPembelian: "",
        hargaBeli: "",
        tanggalBeli: "",
        satuan:"",
        
    });
    const [bahanbakuList, setBahanBakuList] = useState([{ tanggalBeli: '' }]);

const handleAddBahanBaku = () => {
    setBahanBakuList([...bahanbakuList, { tanggalBeli: '' }]);
};

const handleRemoveBahanBaku = (index) => {
    const updatedBahanBakuList = [...bahanbakuList];
    updatedBahanBakuList.splice(index, 1);
    setBahanBakuList(updatedBahanBakuList);
};



    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedBahanBakuList = [...bahanbakuList];
        updatedBahanBakuList[index] = { ...updatedBahanBakuList[index], [name]: value };
        setBahanBakuList(updatedBahanBakuList);
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
                        Tambah Pembelian Bahan Baku
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 md:col-span-2  lg:col-span-3 relative w-full min-w-[100px]">
                                <label htmlFor="tanggalBeli" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Pembelian</label>
                                <Input
                                    id="tanggalBeli"
                                    name="tanggalBeli"
                                    value={formData.tanggalBeli}
                                    onChange={handleChange}
                                    type='date'
                                    size="md"
                                    label="Tanggal Pembelian"
                                    placeholder='Lapis Legit'
                                    required
                                />
                            </div>
                            
                            {bahanbakuList.map((bahanbaku, index) => (
                                <div key={index} className="col-span-1  mb-4">
                                    <label htmlFor={`namaBahanBaku_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Nama Bahan Baku {index + 1}</label>
                                    <select
                                        required
                                        name={`namaBahanBaku_${index}`}
                                        id={`namaBahanBaku_${index}`}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                        placeholder={`Nama Bahan Baku ${index + 1}`}
                                        style={{ width: '100%' }}
                                        onChange={setFormData}
                                        
                                    >
                                        <option value="">Pilih Nama Bahan Baku {index + 1} </option>
                                        <option value="BahanBaku A">Bahan Baku A</option>
                                        <option value="BahanBaku B">Bahan Baku B</option>
                                        <option value="BahanBaku C">Bahan Baku C</option>
                                    </select>
                                    
                                    <div className="mb-4 mt-4 relative w-full min-w-[100px]">
                                        <label htmlFor={`jumlahPembelian_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Jumlah Pembelian Bahan Baku {index + 1}</label>
                                        <Input
                                            id="jumlahPembelian"
                                            name="jumlahPembelian"
                                            value={formData.jumlahPembelian}
                                            onChange={handleChange}
                                            type='number'
                                            size="md"
                                            label={`Jumlah Bahan Baku ${index + 1}`}
                                            placeholder='100'
                                            required
                                        />
                                    </div>
                                    <label htmlFor={`satuan_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Satuan {index + 1}</label>
                                    <select
                                        required
                                        name={`satuan_${index}`}
                                        id={`satuan_${index}`}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                        placeholder={`Satuan Bahan Baku ${index + 1}`}
                                        style={{ width: '100%' }}
                                        onChange={setFormData}
                                        
                                    >
                                        <option value="">Satuan Bahan Baku {index + 1} </option>
                                        <option value="gram">gram</option>
                                        <option value="ml">ml</option>
                                        <option value="pcs">pcs</option>
                                    </select>
                                    <div className="mb-4 mt-4 relative w-full min-w-[100px]">
                                        <label htmlFor={`hargaBelindex}`} className="block mb-2 text-sm font-medium text-gray-900">Harga Beli Bahan Baku {index + 1}</label>
                                        <Input
                                            id="hargaBeli"
                                            name="hargaBeli"
                                            value={formData.hargaBeli}
                                            onChange={handleChange}
                                            type='number'
                                            size="md"
                                            label={`Harga Beli Bahan Baku ${index + 1}`}
                                            placeholder='100'
                                            required
                                        />
                                    </div>
                                </div>
                                
                            ))}

                        </div>
                        <div className="mt-10 flex justify-between">
                            <div>
                                <Button type="button" onClick={() => handleRemoveBahanBaku(bahanbakuList.length - 1)}  disabled={bahanbakuList.length <= 1}className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faTrash} /> Hapus Bahan Baku
                                </Button>
                                <Button type="button" onClick={handleAddBahanBaku} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Bahan Baku
                                </Button>
                            </div>

                            <div>
                                <Link className="mb-2" to="/mo/pencatatanPembelianBahanBaku/read">
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

export default AddPembelianBahanBaku;