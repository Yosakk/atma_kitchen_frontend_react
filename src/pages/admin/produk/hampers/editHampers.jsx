import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { showDataHampersByID } from "../../../../api/admin/ProdukApi";
import { showDataProduk } from "../../../../api/admin/ProdukApi";
import { showDataBahanBaku } from "../../../../api/admin/BahanBakuApi";

const EditHampers = () => {
    let { id } = useParams();
    console.log(id);
    const [formData, setFormData] = useState({
        nama_produk_hampers: "",
        gambarProduk: "",
        harga_produk_hampers: "",
        id_bahan_baku: "",
        id_produk: "",

    });
    const [dataProduk, setDataProduk] = useState([]);
    const [dataBahanBaku, setDataBahanBaku] = useState([]);
    const [produkList, setProdukList] = useState([{ namaProduk: '' }]);
    const [bahanbakuList, setBahanBakuList] = useState([{ id_bahan_baku: '' }]);
    const [bahanbakuListAr, setBahanBakuListAr] = useState([]);
    const handleAddProduk = () => {
        setProdukList([...produkList, { namaProduk: '' }]);
    };

    const handleRemoveProduk = (index) => {
        const updatedProdukList = [...produkList];
        updatedProdukList.splice(index, 1);
        setProdukList(updatedProdukList);
    };

    const fetchDataProduk = async () => {
        try {
            const response = await showDataProduk();
            setDataProduk(response.data);
        } catch (error) {
            console.log("Error fetching stok produk:", error);
        }
    }

    const fetchDataBahanBaku = async () => {
        try {
            const response = await showDataBahanBaku();
            setDataBahanBaku(response.data);
        } catch (error) {
            console.log("Error fetching stok produk:", error);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await showDataHampersByID(id);
                setFormData({
                    nama_produk_hampers: response.data.nama_produk_hampers,
                    harga_produk_hampers: response.data.harga_produk_hampers,
                    id_produk: response.data.detail_produk_hampers[0].id_produk,
                });
                const bahanBakuData = response.data.detail_produk_hampers.map((detailProduk) => ({
                    id_bahan_baku: detailProduk.id_bahan_baku
                }));
                setBahanBakuListAr(bahanBakuData);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        console.log("ini id bahan baku", formData.id_bahan_baku);
        fetchDataProduk();
        fetchDataBahanBaku();
        fetchData();
    }, [id]);


    const handleAddBahanBaku = () => {
        setBahanBakuList([...bahanbakuList, { id_bahan_baku: '' }]);
    };

    const handleRemoveBahanBaku = (index) => {
        const updatedBahanBakuList = [...bahanbakuList];
        updatedBahanBakuList.splice(index, 1);
        setBahanBakuList(updatedBahanBakuList);
    };

    const handleChangeBahanBaku = (index, event) => {
        if (event && event.target) {
            const { name, value } = event.target;
            const updatedBahanBakuList = [...bahanbakuList];
            updatedBahanBakuList[index] = { ...updatedBahanBakuList[index], [name]: value };
            setBahanBakuList(updatedBahanBakuList);
        } else {
            console.error("Event or event.target is undefined.");
        }
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
                        Ubah Hampers
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4  relative w-full min-w-[100px]">
                                <label htmlFor="namaProduk" className="block mb-2 text-sm font-medium text-gray-900">Nama Paket Hampers</label>
                                <Input
                                    id="namaProduk"
                                    name="namaProduk"
                                    value={formData.nama_produk_hampers}
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
                                    value={formData.harga_produk_hampers}
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
                                    <label htmlFor={`produk_id[${index}]`} className="block mb-2 text-sm font-medium text-gray-900">Nama Produk {index + 1}</label>
                                    <select
                                        name="produk_id"
                                        id={`produk_id[${index}]`}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                        placeholder={`Nama Produk ${index + 1}`}
                                        style={{ width: '100%' }}
                                        onChange={(event) => handleChange(index, event)}
                                        required
                                    >
                                        <option value="Produk A" >Pilih Nama Produk {index + 1} </option>
                                        {dataProduk.map((produk) => (
                                            <option key={produk.id_produk} value={produk.id_produk}>{produk.nama_produk}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                            {bahanbakuList.map((bahanbaku, index) => (
                                <div key={index} className="col-span-1 mb-4">
                                    <label htmlFor={`bahan_baku[${index}]`} className="block mb-2 text-sm font-medium text-gray-900">
                                        Nama Bahan Baku {index + 1}
                                    </label>
                                    <select
                                        name={`id_bahan_baku`}
                                        id={`id_bahan_baku[${index}]`}
                                        value={bahanbakuListAr.id_bahan_baku}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                        placeholder={`Nama Bahan Baku ${index + 1}`}
                                        style={{ width: '100%' }}
                                        onChange={(event) => handleChangeBahanBaku(index, event)}
                                        required
                                    >
                                        <option value="">Pilih Nama Bahan Baku {index + 1} </option>
                                        {dataBahanBaku.map((bahanBaku) => (
                                            <option key={bahanBaku.id_bahan_baku} value={bahanBaku.id_bahan_baku}>{bahanBaku.nama_bahan_baku}</option>
                                        ))}
                                    </select>
                                    {bahanbakuList.length > 1 && (
                                        <Button type="button" onClick={() => handleRemoveBahanBaku(index)} className="w-full lg:w-auto text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                            <FontAwesomeIcon icon={faTrash} /> Hapus Bahan Baku
                                        </Button>
                                    )}
                                </div>
                            ))}



                        </div>
                        <div className="mt-10 flex justify-between">
                            <div>
                                <Button type="button" onClick={() => handleRemoveProduk(produkList.length - 1)} disabled={produkList.length <= 1} className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faTrash} /> Hapus Produk
                                </Button>
                                <Button type="button" onClick={handleAddProduk} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Produk
                                </Button>
                            </div>
                            <div>
                                <Button type="button" onClick={() => handleRemoveBahanBaku(bahanbakuList.length - 1)} disabled={bahanbakuList.length <= 1} className="w-full lg:w-auto text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faTrash} /> Hapus Bahan Baku
                                </Button>
                                <Button type="button" onClick={handleAddBahanBaku} className="w-full lg:w-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Bahan Baku
                                </Button>
                            </div>

                            <div>
                                <Link to="/admin/produk/read">
                                    <Button
                                        type="cancel"
                                        className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0"
                                    >
                                        <FontAwesomeIcon icon={faClose} className="mr-2" /> Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0"
                                >
                                    <FontAwesomeIcon icon={faSave} className="mr-2" /> Simpan
                                </Button>
                            </div>
                        </div>

                    </form>
                </CardBody>
            </Card>
        </div >
    );
};

export default EditHampers;