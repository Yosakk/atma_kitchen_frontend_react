import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";

const EditPencatatanPengeluaranLain = () => {
    const [formData, setFormData] = useState({
        username: "",
        tanggalPengeluaran: "",
    });
    const [pengeluaranlainList, setPengeluaranLainList] = useState([{ namaPengeluaran: "", jumlahPengeluaran: "", hargaSatuan: "", totalHarga: "" }]);

    const handleAddPengeluaranLain = () => {
        setPengeluaranLainList([...pengeluaranlainList, { namaPengeluaran: "", jumlahPengeluaran: "", hargaSatuan: "", totalHarga: "" }]);
    };

    const handleRemovePengeluaranLain = (index) => {
        const updatedPengeluaranLainList = [...pengeluaranlainList];
        updatedPengeluaranLainList.splice(index, 1);
        setPengeluaranLainList(updatedPengeluaranLainList);
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedPengeluaranLainList = [...pengeluaranlainList];
        const jumlahPengeluaran = name === "jumlahPengeluaran" ? value : updatedPengeluaranLainList[index].jumlahPengeluaran;
        const hargaSatuan = name === "hargaSatuan" ? value : updatedPengeluaranLainList[index].hargaSatuan;
    
        updatedPengeluaranLainList[index] = {
            ...updatedPengeluaranLainList[index],
            [name]: value,
            totalHarga: parseInt(jumlahPengeluaran) * parseInt(hargaSatuan),
        };
        setPengeluaranLainList(updatedPengeluaranLainList);
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
                        Ubah Pembelian Bahan Baku
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 md:col-span-1 lg:col-span-2 relative w-full min-w-[100px]">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <Input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    type='text'
                                    size="md"
                                    label="Username"
                                    placeholder='Pembelian Listrik'
                                    required
                                />
                            </div>
                            <div className="mb-4 col-span-1 relative w-full min-w-[100px]">
                                <label htmlFor="tanggalPengeluaran" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Pengeluaran</label>
                                <Input
                                    id="tanggalPengeluaran"
                                    name="tanggalPengeluaran"
                                    value={formData.tanggalPengeluaran}
                                    onChange={handleChange}
                                    type='date'
                                    size="md"
                                    label="Tanggal Pengeluaran"
                                    placeholder='Pembelian Listrik'
                                    required
                                />
                            </div>

                            {pengeluaranlainList.map((pengeluaran, index) => (
                                <div key={index} className="col-span-1  mb-4">
                                    <div className="mb-4 mt-4 relative w-full min-w-[100px]">
                                        <label htmlFor={`namaPengeluaran_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Nama Pengeluaran {index + 1}</label>
                                        <Input
                                            id={`namaPengeluaran_${index}`}
                                            name="namaPengeluaran"
                                            value={pengeluaran.namaPengeluaran}
                                            onChange={(e) => handleChange(e, index)}
                                            type='text'
                                            size="md"
                                            label={`Nama Pengeluaran ${index + 1}`}
                                            placeholder=''
                                            required
                                        />
                                    </div>                                   
                                    <div className="mb-4 mt-4 relative w-full min-w-[100px]">
                                        <label htmlFor={`jumlahPengeluaran_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Jumlah Pengeluaran {index + 1}</label>
                                        <Input
                                            id={`jumlahPengeluaran_${index}`}
                                            name="jumlahPengeluaran"
                                            value={pengeluaran.jumlahPengeluaran}
                                            onChange={(e) => handleChange(e, index)}
                                            type='number'
                                            size="md"
                                            label={`Jumlah Pengeluaran ${index + 1}`}
                                            placeholder=''
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 mt-4 relative w-full min-w-[100px]">
                                        <label htmlFor={`hargaSatuan_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Harga Satuan {index + 1}</label>
                                        <Input
                                            id={`hargaSatuan_${index}`}
                                            name="hargaSatuan"
                                            value={pengeluaran.hargaSatuan}
                                            onChange={(e) => handleChange(e, index)}
                                            type='number'
                                            size="md"
                                            label={`Harga Satuan ${index + 1}`}
                                            placeholder=''
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 mt-4 relative w-full min-w-[100px]">
                                        <label htmlFor={`totalHarga_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Total Harga {index + 1}</label>
                                        <Input
                                            id={`totalHarga_${index}`}
                                            name="totalHarga"
                                            value={pengeluaran.totalHarga}
                                            type='number'
                                            size="md"
                                            label={`Total Harga ${index + 1}`}
                                            placeholder='100'
                                            required
                                            readOnly
                                        />
                                    </div>
                                </div>
                                
                            ))}

                        </div>
                        <div className="mt-10 flex justify-between">
                            <div>
                                <Button type="button" onClick={() => handleRemovePengeluaranLain(pengeluaranlainList.length - 1)}  disabled={pengeluaranlainList.length <= 1}className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faTrash} /> Hapus Bahan Baku
                                </Button>
                                <Button type="button" onClick={handleAddPengeluaranLain} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Bahan Baku
                                </Button>
                            </div>

                            <div>
                                <Link className="mb-2" to="/mo/pencatatanPembelianPengeluaranLain/read">
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

export default EditPencatatanPengeluaranLain;
