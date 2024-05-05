import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Radio, Button, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";
import { showDataPenitip } from "../../../api/admin/ProdukApi";
import { showDataProduk } from "../../../api/admin/ProdukApi";
import { editDataProduk } from "../../../api/admin/ProdukApi";
import { addProduk } from "../../../validation/ValidationProduk/validationProduk";
import { motion } from 'framer-motion';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_ALL_FIELDS':
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};

const EditProduk = () => {
    const [formData, setFormData] = useReducer(formReducer, {
        nama_produk: "",
        deskripsi_produk: "",
        harga_produk: "",
        kategori_produk: "",
        quantitas: "",
        id_penitip: "",
        stok_produk: "",
        limit_harian: "",
        id_stok_produk: "",
        isStokTersedia: false
    });
    const [dataPenitip, setDataPenitip] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [dataStokProduk, setDataStokProduk] = useState([]);
    const [dataEditPenitip, setDataEditPenitip] = useState([]);
    const [data, setData] = useState({
        id_produk: "",
        nama_produk: "",
        deskripsi_produk: "",
        harga_produk: "",
        kategori_produk: "",
        quantitas: "",
        id_penitip: "",
        stok_produk: "",
        limit_harian: "",
        id_stok_produk: "",
        isStokTersedia: false
    });

    useEffect(() => {
        fetchDataPenitip();
        fetchDataStokProduk();
        const editedProduk = JSON.parse(sessionStorage.getItem("selectedProduk"));
        console.log("INI bagian Session", editedProduk);
        setData({
            id_produk: editedProduk.idProduk || "",
            nama_produk: editedProduk.namaProduk || "",
            deskripsi_produk: editedProduk.deskripsiProduk || "",
            harga_produk: editedProduk.hargaProduk || "",
            kategori_produk: editedProduk.kategoriProduk || "",
            quantitas: editedProduk.kuantitas.toString(),
            id_penitip: editedProduk.idPenitip.toString(),
            stok_produk: editedProduk.stokProduk || "",
            limit_harian: editedProduk.limitHarian || "",
            id_stok_produk: editedProduk.idStokProduk || "",
        });
        console.log("INI bagian Data", data);
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (data[name] !== value) { // Memeriksa apakah ada perubahan nilai
            if (name === "nama_produk" && value.trim() === "") {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Nama produk wajib diisi!",
                }));
            } else {
                // Jika inputan nama_produk tidak kosong, hapus pesan kesalahan yang terkait
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: undefined,
                }));
            }
            if (name === "kategori_produk" && value === "") {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Kategori produk wajib dipilih!",
                }));
            } else {
                // Jika inputan kategori_produk tidak kosong, hapus pesan kesalahan yang terkait
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: undefined,
                }));
            }

            if (name === "quantitas" && value === "") {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Kuantitas wajib dipilih!",
                }));
            } else {
                // Jika inputan kuantitas tidak kosong, hapus pesan kesalahan yang terkait
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: undefined,
                }));
            }
            if (name) {
                if (name === "harga_produk" || name === "stok_produk") {
                    const numericValue = name === "harga_produk" ? parseFloat(value) : parseInt(value, 10);
                    if (isNaN(numericValue)) {
                        console.log("Harga Produk")
                        setData((prevData) => ({
                            ...prevData,
                            [name]: numericValue,
                        }));
                        setFormErrors((prevErrors) => ({
                            ...prevErrors,
                            [name]: name === "harga_produk" ? "Harap masukkan harga yang valid!" : "Harap masukkan stok yang valid!",
                        }));
                    } else {
                        setData((prevData) => ({
                            ...prevData,
                            [name]: numericValue,
                        }));
                        setFormData({ target: { name, value: numericValue } });
                    }
                } else if (name === "kategori_produk" && value !== "Titipan") {
                    setData((prevFormData) => ({
                        ...prevFormData,
                        namaPenitip: "",
                        stokProdukTitipan: "",
                        [name]: value,
                    }));
                    setFormData({ target: { name, value } });
                } else {
                    setData((prevFormData) => ({
                        ...prevFormData,
                        [name]: value,
                    }));
                    setFormData({ target: { name, value } });
                }
            } else {
                setData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
                }));
                setFormData({ target: { name, value } });
            }

            if (name === "stokTersedia") {
                // Jika memilih Stok Tersedia, reset id_stok_produk
                if (value === "Tersedia") {
                    setData((prevData) => ({
                        ...prevData,
                        id_stok_produk: "",
                    }));
                    setFormData({ target: { name: "id_stok_produk", value: "" } });
                }
            }
        } else {
            console.error("Name is not defined in event target:", e.target);
        }
    };

    useEffect(() => {
        setFormData({ type: 'UPDATE_ALL_FIELDS', data: data });
    }, [data], []);

    useEffect(() => {
        fetchDataPenitip();
        fetchDataStokProduk();
    }, []);

    const fetchDataPenitip = async () => {
        try {
            const response = await showDataPenitip();
            setDataPenitip(response.data);
        } catch (error) {
            console.error("Error fetching penitip:", error);
        }
    }
    const fetchDataStokProduk = async () => {
        try {
            const response = await showDataProduk();
            setDataStokProduk(response.data);
        } catch (error) {
            console.log("Error fetching stok produk:", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationResult = addProduk.safeParse(formData);
        if (!validationResult.success) {
            const newErrors = {};
            for (const error of validationResult.error.errors) {
                newErrors[error.path.join(".")] = error.message;
                console.log(error.message);
            }
            console.log("Hellow");
            return setFormErrors(newErrors);
        }
        setFormErrors({});
        console.log("Hellowwwww: ", formData);
        console.log(data.id_produk);
        editDataProduk(data.id_produk, formData)
            .then((res) => {
                console.log("Hello");
            })
            .catch((err) => {
                console.log("Error", err);
            })
    };

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">
                        Ubah Produk
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 md:col-span-2  lg:col-span-2 relative w-full min-w-[100px]">
                                <label htmlFor="namaProduk" className="block mb-2 text-sm font-medium text-gray-900">Nama Produk</label>
                                <Input
                                    error={!!formErrors.nama_produk}
                                    id="nama_produk"
                                    name="nama_produk"
                                    value={data.nama_produk}
                                    onChange={handleChange}
                                    type='text'
                                    size="md"
                                    label="Nama Produk"
                                    placeholder='Lapis Legit'
                                />
                                {formErrors.nama_produk && (
                                    <motion.span
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                    >
                                        {formErrors.nama_produk}
                                    </motion.span>
                                )}
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="hargaProduk" className="block mb-2 text-sm font-medium text-gray-900">Harga Produk</label>
                                <Input
                                    error={!!formErrors.harga_produk}
                                    id="harga_produk"
                                    name="harga_produk"
                                    value={data.harga_produk}
                                    onChange={handleChange}
                                    type='number'
                                    size="md"
                                    label="Harga Produk"
                                    placeholder='100'

                                />
                                {formErrors.harga_produk && (
                                    <motion.span
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                    >
                                        {formErrors.harga_produk}
                                    </motion.span>
                                )}
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="kategoriProduk" className="block mb-2 text-sm font-medium text-gray-900">Kategori Produk</label>
                                <Select
                                    error={!!formErrors.kategori_produk}
                                    id="kategori_produk"
                                    name="kategori_produk"
                                    value={data.kategori_produk}
                                    onChange={(value) => handleChange({ target: { name: "kategori_produk", value } })}
                                    className="w-full bg-white"
                                    label="Kategori Produk"
                                >
                                    <Option value="" disabled={data.kategori_produk === "Titipan"}>Pilih Kategori Produk</Option>
                                    <Option value="Cake" disabled={data.kategori_produk === "Titipan"}>Cake</Option>
                                    <Option value="Roti" disabled={data.kategori_produk === "Titipan"}>Roti</Option>
                                    <Option value="Minuman" disabled={data.kategori_produk === "Titipan"}>Minuman</Option>
                                    <Option value="Titipan" disabled={data.kategori_produk !== "Titipan"}>Titipan</Option>
                                </Select>


                                {formErrors.kategori_produk && (
                                    <motion.span
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                    >
                                        {formErrors.kategori_produk}
                                    </motion.span>
                                )}
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="quantitas" className="block mb-2 text-sm font-medium text-gray-900">Kuantitas</label>
                                <Select
                                    error={!!formErrors.quantitas}
                                    id="quantitas"
                                    name="quantitas"
                                    label="Kuantitas"
                                    value={data.quantitas}
                                    // Disesuaikan dengan nilai data.quantitas
                                    onChange={(value) => handleChange({ target: { name: "quantitas", value } })}
                                    className="w-full bg-white"
                                >
                                    <Option value="">Pilih Kuantitas</Option>
                                    <Option value="1">1</Option>
                                    <Option value="0.5">0.5</Option>
                                </Select>
                                {formErrors.quantitas && (
                                    <motion.span
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                    >
                                        {formErrors.quantitas}
                                    </motion.span>
                                )}
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="gambarProduk" className="block mb-2 text-sm font-medium text-gray-900">Gambar Produk</label>
                                <Input
                                    id="gambar_produk"
                                    name="gambar_produk"
                                    value={data.gambar_produk}
                                    onChange={handleChange}
                                    type='file'
                                    size="md"
                                    label="Gambar Produk"
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="limitHarianProduk" className="block mb-2 text-sm font-medium text-gray-900">Limit Harian Produk</label>
                                <Input
                                    id="limit_harian"
                                    name="limit_harian"
                                    value={data.limit_harian}
                                    onChange={handleChange}
                                    type='number'
                                    size="md"
                                    label="Limit Harian Produk"
                                    disabled={data.kategori_produk === "Titipan"}
                                    placeholder='10'
                                />
                            </div>

                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="id_penitip" className="block mb-2 text-sm font-medium text-gray-900">Nama Penitip</label>
                                <Select
                                    id="id_penitip"
                                    name="id_penitip"
                                    label="Penitip"
                                    value={data.id_penitip}
                                    onChange={(value) => handleChange({ target: { name: "id_penitip", value } })}
                                    className="w-full bg-white"
                                >
                                    <Option value="">Pilih Penitip</Option>
                                    {dataPenitip.map((penitip) => (
                                        <Option key={penitip.id_penitip} value={String(penitip.id_penitip)}>
                                            {penitip.id_penitip} - {penitip.nama_penitip}
                                        </Option>
                                    ))}
                                </Select>



                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="stokProduk" className="block mb-2 text-sm font-medium text-gray-900">Stok Produk</label>
                                <Input
                                    id="stok_produk"
                                    error={!!formErrors.stok_produk}
                                    name="stok_produk"
                                    value={data.stok_produk}
                                    onChange={handleChange}
                                    type='number'
                                    size="md"
                                    label="Stok Produk"
                                    placeholder='10'
                                    className='w-full'
                                />
                                {formErrors.stok_produk && (
                                    <motion.span
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                    >
                                        {formErrors.stok_produk}
                                    </motion.span>
                                )}
                            </div>
                            <div className="mb-4 col-span-1 md:col-span-2 lg:col-span-3 relative w-full min-w-[100px]">
                                <label htmlFor="deskripsiProduk" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi Produk</label>
                                <Textarea
                                    id="deskripsiProduk"
                                    error={!!formErrors.deskripsi_produk}
                                    name="deskripsi_produk"
                                    value={data.deskripsi_produk}
                                    onChange={handleChange}
                                    type='text'
                                    size="md"
                                    // placeholder='Kue Lapis Legit merupakan makanan khas'
                                    label="Deskripsi Produk"
                                />
                                {formErrors.deskripsi_produk && (
                                    <motion.span
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                    >
                                        {formErrors.deskripsi_produk}
                                    </motion.span>
                                )}
                            </div>

                        </div>
                        <div className="mt-10 flex justify-end">
                            <Link to="/admin/produk/read">
                                <Button
                                    type="cancel"
                                    className="inline-flex items-center px-4 py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <FontAwesomeIcon icon={faClose} className="mr-2" /> Batal
                                </Button>
                            </Link>
                            <Button

                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FontAwesomeIcon icon={faSave} className="mr-2" /> Simpan
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div >
    );
};

export default EditProduk;