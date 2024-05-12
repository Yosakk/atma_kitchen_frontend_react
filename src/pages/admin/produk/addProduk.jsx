import React, { useReducer, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Radio, Option, Button, Alert } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { storeDataProduk } from "../../../api/admin/ProdukApi";
import { showDataPenitip } from "../../../api/admin/ProdukApi";
import { showDataProduk } from "../../../api/admin/ProdukApi";
import { addProduk } from "../../../validation/ValidationProduk/validationProduk";
import { motion } from 'framer-motion';

const formReducer = (state, event) => {
    if (event.target.name === 'gambar_produk') {
        // Penanganan untuk input file
        return {
            ...state,
            gambar_produk: event.target.files[0], // Menggunakan FormData
        };
    } else {
        return {
            ...state,
            [event.target.name]: event.target.value,
        };
    }
};

const AddProduk = () => {
    const [gambarFile, setGambarFile] = useState(null);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [dataPenitip, setDataPenitip] = useState([]);
    const [dataStokProduk, setDataStokProduk] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [isIdPenitipDisabled, setIsIdPenitipDisabled] = useState(true);
    const [data, setData] = useState({
        nama_produk: "",
        gambar_produk: "",
        deskripsi_produk: "",
        harga_produk: "",
        kategori_produk: "",
        quantitas: "",
        id_penitip: "",
        stok_produk: "",
        limit_harian: "",
        id_stok_produk: "",
        isStokTersedia: false // Menyimpan apakah stok tersedia atau tidak
    });

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

    const handleKategoriChange = (e) => {
        const { value } = e.target;
        setData((prevData) => ({
            ...prevData,
            kategori_produk: value,
        }));
        setIsIdPenitipDisabled(value !== "Titipan");
    };
    

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
        const parsedUser = addProduk.safeParse(formData);
        if (!parsedUser.success) {
            console.log("hello");
            const error = parsedUser.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            return setFormErrors(newErrors);
        }
        setLoading(true);
        storeDataProduk(formData)
            .then((res) => {
                sessionStorage.setItem("dataProduk", JSON.stringify(res.data));
                setOpen(true);
                setLoading(false);
                setTimeout(() => {// Delay selama 2 detik
                    navigate("/admin/produk/read")
                }, 2000);
            })
            .catch((err) => {
                setLoading(false);
                setFormErrors({ nama_produk: err.message });
                console.log("Error", err);
            });
    };


    const handleRadioChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            isStokTersedia: e.target.value === "Tersedia"
        }));
    };

    return (
        <div>
            <div className="flex justify-center">
                <Alert
                    className="max-w-md w-auto"
                    color="green"
                    open={open}
                    onClose={() => setOpen(false)}
                    animate={{
                        mount: { y: 0 },
                        unmount: { y: 100 },
                    }}
                    icon={<FontAwesomeIcon icon={faInfoCircle} />}
                >
                    Menambahkan Produk Sukses!
                </Alert>
            </div>


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
                                        // error={!!formErrors.nama_produk}
                                        id="nama_produk"
                                        name="nama_produk"
                                        onChange={setFormData}
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
                                        // error={!!formErrors.harga_produk}
                                        id="harga_produk"
                                        name="harga_produk"
                                        onChange={setFormData}
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
                                    <select
                                        // error={!!formErrors.kategori_produk}
                                        id="kategori_produk"
                                        name="kategori_produk"
                                        onChange={(e) => { setFormData(e); handleKategoriChange(e); }}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                        label="Kategori Produk"
                                    >
                                        <option value="">Pilih Kategori Produk</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Roti">Roti</option>
                                        <option value="Minuman">Minuman</option>
                                        <option value="Titipan">Titipan</option>
                                    </select>


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
                                    <select
                                        // error={!!formErrors.quantitas}
                                        id="quantitas"
                                        name="quantitas"
                                        label="Kuantitas"
                                        onChange={setFormData}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"

                                    >
                                        <option value="">Pilih Kuantitas</option>
                                        <option value="1">1</option>
                                        <option value="0.5">0.5</option>
                                    </select>
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
                                        onChange={(event) => setFormData({ target: event.target })}
                                        type='file'
                                        size="md"
                                        label="Gambar Produk"
                                        required
                                    />
                                    {/* {formErrors.gambar_produk && (
                                        <motion.span
                                            initial={{ y: 20 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                        >
                                            {formErrors.gambar_produk}
                                        </motion.span>
                                    )} */}
                                </div>
                                <div className="mb-4 relative w-full min-w-[100px]">
                                    <label htmlFor="limitHarianProduk" className="block mb-2 text-sm font-medium text-gray-900">Limit Harian Produk</label>
                                    <Input
                                        id="limit_harian"
                                        name="limit_harian"
                                        onChange={setFormData}
                                        type='number'
                                        size="md"
                                        label="Limit Harian Produk"
                                        disabled={data.kategori_produk === "Titipan"}
                                        placeholder='10'
                                    />
                                </div>
                                <div className="mb-4 col-span-1 md:col-span-2 lg:col-span-2 relative w-full min-w-[100px]">
                                    <label htmlFor="namaPenitip" className="block mb-2 text-sm font-medium text-gray-900">Nama Penitip</label>
                                    <select
                                        id="id_penitip"
                                        name="id_penitip"
                                        onChange={setFormData}
                                        className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                        disabled={isIdPenitipDisabled}

                                    >
                                        <option value="">Pilih Nama Penitip</option>
                                        {/* Data penitip yang diambil dari API */}
                                        {dataPenitip.map((penitip) => (
                                            <option key={penitip.id_penitip} value={penitip.id_penitip}>{penitip.nama_penitip}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4 relative w-full min-w-[100px]">
                                    <label htmlFor="stokProdukTitipan" className="block mb-2 text-sm font-medium text-gray-900">Status Stok</label>
                                    <div className="mt-2">
                                        <Radio
                                            id="stokTersedia"
                                            name="stokTersedia"
                                            value="Tersedia"
                                            checked={data.isStokTersedia}
                                            onChange={handleRadioChange}
                                            label="Stok Tersedia"
                                        />
                                        <Radio
                                            id="stokTidakTersedia"
                                            name="stokTersedia"
                                            value="Tidak Tersedia"
                                            checked={!data.isStokTersedia}
                                            onChange={handleRadioChange}
                                            label="Stok Tidak Tersedia"
                                        />
                                    </div>
                                </div>

                                {data.isStokTersedia ? (
                                    <div className="mb-4 col-span-1 md:col-span-2 lg:col-span-2 relative w-full min-w-[100px]">
                                        <label htmlFor="stokProdukTitipan" className="block mb-2 text-sm font-medium text-gray-900">Stok Produk</label>
                                        <div className="mb-4 relative w-full min-w-[100px]">
                                            <select
                                                id="id_stok_produk"
                                                // error={!!formErrors.id_stok_produk}
                                                name="id_stok_produk"
                                                onChange={setFormData}
                                                label="ID Stok Produk"
                                                className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2.5"
                                            >
                                                <option value="">Pilih ID/Nama Produk</option>
                                                {/* Data produk yang diambil dari API */}
                                                {dataStokProduk.map((produk) => (
                                                    <option key={produk.id_produk} value={produk.id_stok_produk}>{produk.id_stok_produk} - {produk.nama_produk} - {produk.stok_produk.stok_produk}</option>
                                                ))}

                                            </select>
                                            {formErrors.id_stok_produk && (
                                                <motion.span
                                                    initial={{ y: 20 }}
                                                    animate={{ y: 0 }}
                                                    exit={{ y: -20, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                                >
                                                    {formErrors.id_stok_produk}
                                                </motion.span>
                                            )}
                                        </div>
                                        <div className="mb-4 relative w-full min-w-[100px]">
                                            <Input
                                                id="stok_produk"
                                                // error={!!formErrors.stok_produk}
                                                name="stok_produk"
                                                onChange={setFormData}
                                                type='number'
                                                size="md"
                                                label="Stok Produk"
                                                placeholder='10'
                                                className='w-full'
                                            />
                                            {/* {formErrors.stok_produk && (
                                                <motion.span
                                                    initial={{ y: 20 }}
                                                    animate={{ y: 0 }}
                                                    exit={{ y: -20, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="font-poppins mt-2 flex items-center text-red-500 text-sm"
                                                >
                                                    {formErrors.stok_produk}
                                                </motion.span>
                                            )} */}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mb-4 col-span-1 md:col-span-2 lg:col-span-2 relative w-full min-w-[100px]">
                                        <label htmlFor="stokProdukTitipan" className="block mb-2 text-sm font-medium text-gray-900">Stok Produk</label>
                                        <div className="mb-4 relative w-full min-w-[100px]">
                                            <Input
                                                id="stok_produk"
                                                // error={!!formErrors.stok_produk}
                                                name="stok_produk"
                                                onChange={setFormData}
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
                                    </div>
                                )}
                                <div className="mb-4 col-span-1 md:col-span-2 lg:col-span-3 relative w-full min-w-[100px]">
                                    <label htmlFor="deskripsiProduk" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi Produk</label>
                                    <Textarea
                                        id="deskripsiProduk"
                                        // error={!!formErrors.deskripsi_produk}
                                        name="deskripsi_produk"
                                        onChange={setFormData}
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
                                    loading={loading}
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FontAwesomeIcon icon={faSave} className="mr-2" /> Simpan
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AddProduk;
