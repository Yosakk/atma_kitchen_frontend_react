import React, { useState, useEffect, useReducer } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showDataPenitipById, UpdatePenitip } from "../../../api/mo/PenitipApi";


const formReducer = (state, event) => {
    if (!event.target.value) {
        return state; // Jika nilai yang dikirimkan kosong, kembalikan state tanpa perubahan
    }
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};


const EditPenitip = () => {
    let { id } = useParams(); // Make sure the parameter name matches your route (/mo/penitip/edit/:id_penitip)
    console.log("masuk edit", id);
    const [penitipData, setPenitipData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useReducer(formReducer, {});
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
    try {
        const response = await showDataPenitipById(id);
        setPenitipData(response.data);
        setIsLoading(false);
    } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
    }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        };
    
        // const handleSubmit = async (e) => {
        //     e.preventDefault();
        //     try {
        //         const response = await UpdatePenitip(id); // Menggunakan id dari useParams dan formData dari state
        //         console.log("Penitip updated:", response);

        //         // Tambahkan logika penanganan setelah penitip berhasil diperbarui
        //     } catch (error) {
        //         console.error("Error updating penitip:", error);
        //         // Tambahkan logika penanganan jika terjadi kesalahan saat memperbarui penitip
        //     }
        // };
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formData);
            // Menunda eksekusi selama 2 detik (2000 milidetik)
            UpdatePenitip(id, formData)
                .then((res) => {
                    console.log("sini")
                    toast.success("Data Penitip berhasil diubah"); 
                    setTimeout(() => {// Delay selama 2 detik
                        navigate("/mo/penitip/read")
                    }, 2000);
                })
                .catch((err) => {
                    console.log("Error", err);
                    toast.error("Terjadi kesalahan saat mengubah data penitip");
                });
        };
        

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">
                        Ubah Penitip
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 col-span-1 md:col-span-2 relative w-full min-w-[100px]">
                                <label htmlFor="nama_penitip" className="block mb-2 text-sm font-medium text-gray-900">Nama Pegawai</label>
                                <Input
                                    id="nama_penitip"
                                    name="nama_penitip"
                                    defaultValue={penitipData.nama_penitip || ''}
                                    onChange={setFormData}
                                    type='text'
                                    size="md"
                                    label="Nama Pegawai"
                                    placeholder='Kang Saun'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="nomor_telepon_penitip" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
                                <Input
                                    id="nomor_telepon_penitip"
                                    name="nomor_telepon_penitip"
                                    defaultValue={penitipData.nomor_telepon_penitip}
                                    onChange={setFormData}
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
                            <Link to="/mo/penitip/read">
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
            <ToastContainer/>
        </div>
    );
};

export default EditPenitip;