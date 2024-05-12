import React, { useState, useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { storeDataHampers } from "../../../../api/admin/ProdukApi";
import { showDataProduk } from "../../../../api/admin/ProdukApi";
import { showDataBahanBaku } from "../../../../api/admin/BahanBakuApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formReducer = (state, event) => {
    if (event.target.name.startsWith('produk_id[')) {
        const key = event.target.name.replace(/[\[\]']+/g, '');
        const index = key.split('produk_id')[1];
        const updatedProdukId = [...(state[`produk_id[${index}]`] || []), event.target.value];
        return {
            ...state,
            [`produk_id[${index}]`]: updatedProdukId,
        };
    } else if (event.target.name.startsWith('id_bahan_baku[')) {
        const key = event.target.name.replace(/[\[\]']+/g, '');
        const index = key.split('id_bahan_baku')[1];
        const updatedBahanBakuId = [...(state[`id_bahan_baku[${index}]`] || []), event.target.value];
        return {
            ...state,
            [`id_bahan_baku[${index}]`]: updatedBahanBakuId,
        };
    } else if (event.target.name === 'gambar_produk_hampers') {
        // Penanganan untuk input file
        return {
            ...state,
            gambar_produk_hampers: event.target.files[0], // Menggunakan FormData
        };
    } else {
        return {
            ...state,
            [event.target.name]: event.target.value,
        };
    }
};

const AddHampers = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [loading, setLoading] = useState(false);
    const [dataProduk, setDataProduk] = useState([]);
    const navigate = useNavigate();
    const [dataBahanBaku, setDataBahanBaku] = useState([]);
    const [data, setData] = useState({
        nama_produk_hampers: "",
        gambar_Produk_hampers: "",
        deskripsi_produk_hampers: "",
        harga_produk_hampers: "",
        id_bahan_baku: ""
    });
    const [produkList, setProdukList] = useState([{ produk_id: '' }]);
    const [bahanbakuList, setBahanBakuList] = useState([{ id_bahan_baku: '' }]);

    useEffect(() => {
        fetchDataProduk();
        fetchDataBahanBaku();
    }, []);

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

    const handleAddProduk = () => {
        setProdukList([...produkList, { produk_id: '' }]);
    };

    const handleRemoveProduk = (index) => {
        const updatedProdukList = [...produkList];
        updatedProdukList.splice(index, 1);
        setProdukList(updatedProdukList);
    };

    const handleAddBahanBaku = () => {
        setBahanBakuList([...bahanbakuList, { id_bahan_baku: '' }]);
    };

    const handleRemoveBahanBaku = (index) => {
        const updatedBahanBakuList = [...bahanbakuList];
        updatedBahanBakuList.splice(index, 1);
        setBahanBakuList(updatedBahanBakuList);
    };


    const handleChange = (index, event) => {
        if (event && event.target) {
            const { name, value } = event.target;
            const updatedProdukList = [...produkList];
            updatedProdukList[index] = { ...updatedProdukList[index], [name]: value };
            setProdukList(updatedProdukList);
        } else {
            console.error("Event or event.target is undefined.");
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(produkList);
        console.log(bahanbakuList);
        const submitData = {
            nama_produk_hampers: formData.nama_produk_hampers,
            harga_produk_hampers: formData.harga_produk_hampers,
            gambar_produk_hampers: formData.gambar_produk_hampers,
            produk_id: produkList.map(item => item.produk_id),
            id_bahan_baku: bahanbakuList.map(item => item.id_bahan_baku)
        };
        storeDataHampers(submitData)
            .then((res) => {
                sessionStorage.setItem("dataProdukHampers", JSON.stringify(res.data));
                setLoading(false);
                toast.success(`Berhasil menambah Data ${submitData.nama_produk_hampers}`);
                setTimeout(() => {// Delay selama 2 detik
                    navigate("/admin/produk/read")
                }, 2000);
            })
            .catch((err) => {
                setLoading(false);
                console.log("Error", err);
            })
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
                            <div className="mb-4 col-span-1 relative w-full min-w-[100px]">
                                <label htmlFor="nama_produk_hampers" className="block mb-2 text-sm font-medium text-gray-900">Nama Paket Hampers</label>
                                <Input
                                    id="nama_produk_hampers"
                                    name="nama_produk_hampers"
                                    onChange={setFormData}
                                    type='text'
                                    size="md"
                                    label="Nama Paket Hampers"
                                    placeholder='Lapis Legit'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="harga_produk_hampers" className="block mb-2 text-sm font-medium text-gray-900">Harga Produk</label>
                                <Input
                                    id="harga_produk_hampers"
                                    name="harga_produk_hampers"
                                    onChange={setFormData}
                                    type='number'
                                    size="md"
                                    label="Harga Produk"
                                    placeholder='100'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="gambar_produk_hampers" className="block mb-2 text-sm font-medium text-gray-900">Gambar Produk</label>
                                <Input
                                    id="gambar_produk_hampers"
                                    name="gambar_produk_hampers"
                                    onChange={(event) => setFormData({ target: event.target })}
                                    type='file'
                                    size="md"
                                    multiple
                                    className="form-control"
                                    label="Gambar Produk"
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label htmlFor="id_bahan_baku" className="block mb-2 text-sm font-medium text-gray-900">Nama Bahan Baku</label>
                                <select
                                    id="id_bahan_baku"
                                    name="id_bahan_baku"
                                    onChange={setFormData}
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                    required
                                >
                                    <option value="Produk A" >Pilih Nama Bahan Baku</option>
                                    {dataBahanBaku.map((bahanBaku) => (
                                        <option key={bahanBaku.id_bahan_baku} value={bahanBaku.id_bahan_baku}>{bahanBaku.nama_bahan_baku}</option>
                                    ))}
                                </select>
                            </div> */}

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
                                <div key={index} className="col-span-1  mb-4">
                                    <label htmlFor={`bahan_baku[${index}]`} className="block mb-2 text-sm font-medium text-gray-900">Nama Bahan Baku {index + 1}</label>
                                    <select
                                        name={`id_bahan_baku`}
                                        id={`id_bahan_baku[${index}]`}
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
                                </div>
                            ))}

                        </div>

                        <div className="mt-10 flex flex-col md:flex-row gap-4 md:justify-between">
                            <div>
                                <Button type="button" onClick={() => handleRemoveProduk(produkList.length - 1)} disabled={produkList.length <= 1} className="w-full lg:w-auto text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faTrash} /> Hapus Produk
                                </Button>
                                <Button type="button" onClick={handleAddProduk} className="w-full lg:w-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
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
                            <div className="justify-end">
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
                                    loading={loading}
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0"
                                >
                                    <FontAwesomeIcon icon={faSave} lo className="mr-2" /> Simpan
                                </Button>
                            </div>

                        </div>
                    </form>
                </CardBody>
            </Card>
            <ToastContainer />
        </div>
    );
};

export default AddHampers;