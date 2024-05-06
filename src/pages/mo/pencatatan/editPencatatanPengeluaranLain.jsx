import React, { useState, useEffect, useReducer } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Input, Select, Textarea, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { storePengeluaranLain, showDataPengeluaranLainbyId, updatePengeluaranLain } from "../../../api/mo/PengeluaranLainApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const formReducer = (state, event) => {
    if (!event.target.value) {
        return state; // Jika nilai yang dikirimkan kosong, kembalikan state tanpa perubahan
    }
    return {
        ...state,
        [event.target.name]: event.target.value,
    };
};

const EditPencatatanPengeluaranLain = () => {
    let { id } = useParams(); // Make sure the parameter name matches your route (/mo/penitip/edit/:id_penitip)
    console.log("masuk edit", id);
    const today = new Date().toISOString().split('T')[0];
    const [formData, setFormData] = useReducer(formReducer, {});
    const [dataPengeluaranLain, setPengeluaranLainData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState({
        nama_pengeluaran: "",
        total_pengeluaran: "",
        tanggal_pengeluaran: "",
    });
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await showDataPengeluaranLainbyId(id);
            setPengeluaranLainData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };
    

    // const [pengeluaranlainList, setPengeluaranLainList] = useState([{ namaPengeluaran: "", jumlahPengeluaran: "", hargaSatuan: "", totalHarga: "" }]);

    // const handleAddPengeluaranLain = () => {
    //     setPengeluaranLainList([...pengeluaranlainList, { namaPengeluaran: "", jumlahPengeluaran: "", hargaSatuan: "", totalHarga: "" }]);
    // };

    // const handleRemovePengeluaranLain = (index) => {
    //     const updatedPengeluaranLainList = [...pengeluaranlainList];
    //     updatedPengeluaranLainList.splice(index, 1);
    //     setPengeluaranLainList(updatedPengeluaranLainList);
    // };

    // const handleChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const updatedPengeluaranLainList = [...pengeluaranlainList];
    //     const jumlahPengeluaran = name === "jumlahPengeluaran" ? value : updatedPengeluaranLainList[index].jumlahPengeluaran;
    //     const hargaSatuan = name === "hargaSatuan" ? value : updatedPengeluaranLainList[index].hargaSatuan;

    //     updatedPengeluaranLainList[index] = {
    //         ...updatedPengeluaranLainList[index],
    //         [name]: value,
    //         totalHarga: parseInt(jumlahPengeluaran) * parseInt(hargaSatuan),
    //     };
    //     setPengeluaranLainList(updatedPengeluaranLainList);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Menunda eksekusi selama 2 detik (2000 milidetik)
        updatePengeluaranLain(id, formData)
            .then((res) => {
                console.log("sini")
                toast.success("Data Pengeluaran Lain berhasil diubah"); 
                setTimeout(() => {// Delay selama 2 detik
                    navigate("/mo/pencatatanPengeluaranLain/read")
                }, 2000);
            })
            .catch((err) => {
                console.log("Error", err);
                toast.error("Terjadi kesalahan saat mengubah data Pengeluaran Lain");
            });
    };

    return (
        <div className="mt-12 mb-8">
            <Card>
                <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
                    <Typography variant="h6" color="white">
                        Edit Pengeluaran Lain
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="nama_pengeluaran" className="block mb-2 text-sm font-medium text-gray-900">Nama Pengeluaran</label>
                                <Input
                                    id="nama_pengeluaran"
                                    name="nama_pengeluaran"
                                    defaultValue={dataPengeluaranLain.nama_pengeluaran || ''}
                                    onChange={setFormData}
                                    type='text'
                                    size="md"
                                    label="Nama Pengeluaran"
                                    placeholder='Listrik'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="total_pengeluaran" className="block mb-2 text-sm font-medium text-gray-900">Total Pengeluaran</label>
                                <Input
                                    id="total_pengeluaran"
                                    name="total_pengeluaran"
                                    defaultValue={dataPengeluaranLain.total_pengeluaran || ''}
                                    onChange={setFormData}
                                    type='number'
                                    size="md"
                                    label="Total Pengeluaran"
                                    placeholder='200000'
                                    required
                                />
                            </div>
                            <div className="mb-4 relative w-full min-w-[100px]">
                                <label htmlFor="tanggal_pengeluaran" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Pengeluaran</label>
                                <Input
                                    id="tanggal_pengeluaran"
                                    name="tanggal_pengeluaran"
                                    defaultValue={dataPengeluaranLain.tanggal_pengeluaran || ''}
                                    onChange={setFormData}
                                    type='date'
                                    size="md"
                                    placeholder='Listrik'
                                    max={today}
                                    required
                                />
                            </div>

                            {/* {pengeluaranlainList.map((pengeluaran, index) => (
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
                                
                            ))} */}

                        </div>
                        <div className="mt-10 flex justify-end">
                            {/* <div>
                                <Button type="button" onClick={() => handleRemovePengeluaranLain(pengeluaranlainList.length - 1)}  disabled={pengeluaranlainList.length <= 1}className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faTrash} /> Hapus Bahan Baku
                                </Button>
                                <Button type="button" onClick={handleAddPengeluaranLain} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 focus:ring-0">
                                    <FontAwesomeIcon icon={faPlus} /> Tambah Bahan Baku
                                </Button>
                            </div> */}

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
                                    loading={loading}
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

export default EditPencatatanPengeluaranLain;
