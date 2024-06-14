import React, { useState, useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { storeDataResep } from "../../../api/admin/ResepApi";
import { showDataBahanBaku } from "../../../api/admin/BahanBakuApi";
import { showDataProduk } from "../../../api/admin/ProdukApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const AddResep = () => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [resepData, setResepData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [produkData, setProdukData] = useState([]);
    const [bahanBakuData, setBahanBakuData] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        id_produk: "",
        id_bahan_baku: "",
        jumlah_bahan: "",
    });

    useEffect(() => {
        fetchDataProduk();
        fetchDataBahanBaku();
    }, []);

    const fetchDataProduk = async () => {
        try {
            const response = await showDataProduk();
            setProdukData(response.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchDataBahanBaku = async () => {
        try {
            const response = await showDataBahanBaku();
            setBahanBakuData(response.data);

        } catch (error) {
            console.error("Error fetching data:", error);

        }
    };

    // const [bahanbakuList, setBahanBakuList] = useState([{ namaProduk: '' }]);

    // const handleAddBahanBaku = () => {
    //     setBahanBakuList([...bahanbakuList, { namaProduk: '' }]);
    // };

    // const handleRemoveBahanBaku = (index) => {
    //     const updatedBahanBakuList = [...bahanbakuList];
    //     updatedBahanBakuList.splice(index, 1);
    //     setBahanBakuList(updatedBahanBakuList);
    // };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     const updatedBahanBakuList = [...bahanbakuList];
    //     updatedBahanBakuList[index] = { ...updatedBahanBakuList[index], [name]: value };
    //     setBahanBakuList(updatedBahanBakuList);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        storeDataResep(formData)
            .then((res) => {
                sessionStorage.setItem("dataResep", JSON.stringify(res.data));
                setLoading(false);
                toast.success("Data Resep berhasil diubah"); 
                setTimeout(() => {// Delay selama 2 detik
                    navigate("/admin/resep/read")
                }, 2000);
            })
            .catch((err) => {
                setLoading(false);
                console.log("Error", err);
                toast.error("Terjadi kesalahan saat mengubah data Resep");
            })
    };

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">
                        Tambah Resep
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="id_produk" className="block mb-2 text-sm font-medium text-gray-900">Nama Produk</label>
                                <select
                                    required
                                    id="id_produk"
                                    name="id_produk"
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                    placeholder="Nama Produk"
                                    onChange={setFormData}
                                >
                                    <option value="">Pilih Nama Produk</option>
                                    {produkData.map((Produk) => (
                                        <option key={Produk.id_produk} value={Produk.id_produk}>{Produk.nama_produk}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="id_bahan_baku" className="block mb-2 text-sm font-medium text-gray-900">Nama Produk</label>
                                <select
                                    required
                                    id="id_bahan_baku"
                                    name="id_bahan_baku"
                                    className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                    placeholder="Nama Produk"
                                    onChange={setFormData}
                                >
                                    <option value="">Pilih Nama Produk</option>
                                    {bahanBakuData.map((BahanBaku) => (
                                        <option key={BahanBaku.id_bahan_baku} value={BahanBaku.id_bahan_baku}>{BahanBaku.nama_bahan_baku}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="jumlah_bahan" className="block mb-2 text-sm font-medium text-gray-900">Nama Produk</label>
                                <Input
                                    id="jumlah_bahan"
                                    name="jumlah_bahan"
                                    onChange={setFormData}
                                    type='number'
                                    size="md"
                                    label="Jumlah Bahan Baku"
                                    placeholder='100'
                                    required
                                />
                            </div>

                            {/* {bahanbakuList.map((bahanbaku, index) => (
                                <div key={index} className="col-span-1  mb-4">
                                    <label htmlFor={`namaBahanBaku_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Nama BahanBaku {index + 1}</label>
                                    <select
                                        required
                                        name={`namaBahanBaku_${index}`}
                                        id={`namaBahanBaku_${index}`}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                        placeholder={`Nama BahanBaku ${index + 1}`}
                                        style={{ width: '100%' }}
                                        onChange={setFormData}

                                    >
                                        <option value="">Pilih Nama Bahan Baku {index + 1} </option>
                                        <option value="BahanBaku A">Bahan Baku A</option>
                                        <option value="BahanBaku B">Bahan Baku B</option>
                                        <option value="BahanBaku C">Bahan Baku C</option>
                                    </select>

                                    <div className="mb-4 mt-4 relative w-full min-w-[100px]">
                                        <label htmlFor={`jumlahBahan_${index}`} className="block mb-2 text-sm font-medium text-gray-900">Jumlah Bahan {index + 1}</label>
                                        <Input
                                            id="jumlahBahanBaku"
                                            name="jumlahBahanBaku"
                                            value={formData.jumlahBahanBaku}
                                            onChange={handleChange}
                                            type='number'
                                            size="md"
                                            label="Jumlah Bahan Baku"
                                            placeholder='100'
                                            required
                                        />
                                    </div>
                                </div>

                            ))} */}

                        </div>
                        <div className="mt-10 flex justify-end">
                            {/* <div>
                                <Button type="button" onClick={() => handleRemoveBahanBaku(bahanbakuList.length - 1)} disabled={bahanbakuList.length <= 1} className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faTrash} /> Hapus Bahan Baku
                                </Button>
                                <Button type="button" onClick={handleAddBahanBaku} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Bahan Baku
                                </Button>
                            </div> */}

                            <div>
                                <Link className="mb-2" to="/admin/resep/read">
                                    <Button
                                        type="cancel"
                                        className="mb-2 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0"
                                    >
                                        <FontAwesomeIcon icon={faClose} className="mr-2" /> Batal
                                    </Button>
                                </Link>

                                <Button
                                    loading={loading}
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
            <ToastContainer/>
        </div>
    );
};

export default AddResep;