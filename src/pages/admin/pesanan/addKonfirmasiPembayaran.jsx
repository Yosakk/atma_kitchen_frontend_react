import React, { useReducer, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Select,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSave, faClose } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImageBuktiPembayaran } from "../../../api";
import { editStatusTransaksiAdmin } from "../../../api/customer/TransaksiApi";
import image1 from "../../../assets/images/Carousel/background-906135_1280.jpg";
import { showPembayaran } from "../../../api/customer/PembayaranApi";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const AddKonfirmasiPembayaran = () => {
  let { id } = useParams();
  console.log("masuk history", id);
  const [formData, setFormData] = useReducer(formReducer, { status_transaksi: "Pembayaran Valid" });
  const [buktiPembayaran, setBuktiPembayaran] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    showPembayaran(id)
      .then((res) => {
        setBuktiPembayaran(res.data.bukti_pembayaran);
      })
      .catch((err) => {
        console.log("Error fetching pembayaran:", err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editStatusTransaksiAdmin(id, formData)
      .then((res) => {
        toast.success("Data Bahan Baku berhasil diubah");
        setTimeout(() => {
          navigate("/admin/konfirmasi/read");
        }, 2000);
      })
      .catch((err) => {
        console.log("Error", err);
        toast.error("Terjadi kesalahan saat menginput jarak");
      });
  };

  return (
    <div className="mt-12 mb-8">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Konfirmasi Pembayaran
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <img
                src={getImageBuktiPembayaran(buktiPembayaran)}
                alt="Bukti Pembayaran"
                className="max-w-full h-auto"
                style={{ maxWidth: "500px", maxHeight: "1000px" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="mb-6 col-span-1 md:col-span-2 relative w-full min-w-[100px] h-10">
                <label
                  htmlFor="jumlah_pembayaran"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Jumlah Pembayaran
                </label>
                <Input
                  id="jumlah_pembayaran"
                  name="jumlah_pembayaran"
                  onChange={setFormData}
                  type="number"
                  size="md"
                  label="Jumlah Pembayaran"
                  className="w-sm"
                  placeholder="100000"
                  required
                />
              </div>
              {/* <div className="mb-6 relative w-full min-w-[100px] h-10">
                <label
                  htmlFor="status_transaksi"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Status Transaksi
                </label>
                <Input
                  id="status_transaksi"
                  name="status_transaksi"
                  defaultValue="Pembayaran Valid"
                  onChange={setFormData}
                  type="text"
                  size="md"
                  label="Status Transaksi"
                  className="w-sm"
                  required
                />
              </div> */}
            </div>
            <div className="mt-10 flex justify-end">
              <Link to="/admin/konfirmasi/read">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 mr-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FontAwesomeIcon icon={faClose} className="mr-2" /> Batal
                </button>
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" /> Konfirmasi
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AddKonfirmasiPembayaran;
