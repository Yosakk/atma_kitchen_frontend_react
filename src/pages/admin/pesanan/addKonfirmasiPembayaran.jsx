import React, { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getImage } from "../../../api";

import image1 from "../../../assets/images/Carousel/background-906135_1280.jpg";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const AddKonfirmasiPembayaran = () => {
  const [formData, setFormData] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Anda dapat menambahkan logika untuk mengunggah bukti pembayaran ke server di sini.
    storeBahanBaku(formData)
      .then((res) => {
        toast.success("Data Bahan Baku berhasil diubah");
        setTimeout(() => {
          navigate("/admin/bahanBaku/read");
        }, 2000);
      })
      .catch((err) => {
        console.log("Error", err);
        toast.error("Terjadi kesalahan saat mengubah data Bahan Baku");
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
                src={image1}
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
                  onChange={handleChange}
                  type="number"
                  size="md"
                  label="Jumlah Pembayaran"
                  className="w-sm"
                  placeholder="100000"
                  required
                />
              </div>
              <div className="mb-6 relative w-full min-w-[100px] h-10">
                <label
                  htmlFor="status_transaksi"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Status Transaksi
                </label>
                <Input
                  id="status_transaksi"
                  name="status_transaksi"
                  value="Sudah Dibayar"
                  onChange={handleChange}
                  type="text"
                  size="md"
                  label="Status Transaksi"
                  className="w-sm"
                  required
                />
              </div>
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
