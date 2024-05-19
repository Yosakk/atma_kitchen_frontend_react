import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavbarLogin from "../../components/NavbarLogin";
import FooterUser from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";

const PembayaranPage = () => {
  let { id } = useParams();
  console.log("masukparams", id);

  // Harga barang atau layanan
  const hargaBarang = 100000;
  const nilaiSatuPoin = 100;

  const [file, setFile] = useState(null);
  const [pointsUsed, setPointsUsed] = useState("");
  const [totalPembayaran, setTotalPembayaran] = useState(hargaBarang);
  const [poinDiperoleh, setPoinDiperoleh] = useState(0);
  const [totalSetelahPoin, setTotalSetelahPoin] = useState(hargaBarang);
  const [sisaPoin, setSisaPoin] = useState(0);
  const [totalPoinSebelumnya, setTotalPoinSebelumnya] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // Perhitungan total harga setelah dikurangi dengan penggunaan poin
    const totalSetelahPoin = totalPembayaran - pointsUsed * nilaiSatuPoin;
    setTotalSetelahPoin(totalSetelahPoin);
  }, [pointsUsed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi di sini
    // Misalnya, pastikan file sudah dipilih dan total penggunaan poin tidak melebihi poin yang dimiliki oleh pengguna
    // Jika validasi berhasil, lakukan pengiriman data ke backend atau lakukan tindakan sesuai kebutuhan

    // Contoh validasi:
    if (!file) {
      toast.error("Silakan pilih gambar bukti pembayaran.");
      return;
    }

    if (parseInt(pointsUsed) <= 0 || isNaN(parseInt(pointsUsed))) {
      toast.error("Total penggunaan poin harus diisi dengan angka yang valid.");
      return;
    }

    // Perhitungan poin yang diperoleh dari transaksi baru
    const poinDiperolehBaru = parseInt(totalPembayaran / nilaiSatuPoin);
    const poinYangBisaDigunakan = totalPoinSebelumnya + poinDiperoleh;

    // Validasi penggunaan poin tidak boleh melebihi jumlah poin yang dimiliki
    if (parseInt(pointsUsed) > poinYangBisaDigunakan) {
      toast.error("Penggunaan poin melebihi jumlah poin yang dimiliki.");
      return;
    }

    // Perhitungan sisa poin yang dimiliki setelah pembayaran
    const sisaPoin = poinYangBisaDigunakan - parseInt(pointsUsed);

    // setPoinDiperoleh(poinDiperolehBaru);
    setSisaPoin(sisaPoin);
    // Lakukan tindakan lanjutan di sini, seperti pengiriman data ke backend
    // Contoh:
    // fetch('/api/pembayaran', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         file: file,
    //         pointsUsed: pointsUsed
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Lakukan sesuatu setelah berhasil melakukan pembayaran, misalnya navigasi ke halaman lain
    //     navigate('/konfirmasi-pembayaran');
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    //     toast.error("Terjadi kesalahan saat melakukan pembayaran. Silakan coba lagi nanti.");
    // });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavbarLogin />

      <div className="flex justify-center items-center mt-20">
        <div className="max-w-md w-full">
          <Card className="mt-20 mb-20">
            <CardHeader color="black" contentPosition="none">
              <div className="flex justify-center">
                <h4 className="text-orange text-2xl font-semibold py-5">
                  Form Pembayaran
                </h4>
              </div>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Total Pembayaran
                  </label>
                  <p className="text-blue text-lg">{totalPembayaran} IDR</p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Poin yang Diperoleh
                  </label>
                  <p className="text-blue text-lg">{poinDiperoleh} Poin</p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Total Setelah Poin
                  </label>
                  <p className="text-blue text-lg">{totalSetelahPoin} IDR</p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Sisa Poin
                  </label>
                  <p className="text-blue text-lg">{sisaPoin} Poin</p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Bukti Pembayaran
                  </label>
                  <Input
                    type="file"
                    color="lightBlue"
                    size="regular"
                    label="Bukti Pembayaran"
                    outline={false}
                    placeholder="Upload Gambar Bukti Pembayaran"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Penggunaan Poin
                  </label>
                  <Input
                    type="number"
                    color="lightBlue"
                    size="regular"
                    label="Pengunaan Poin"
                    outline={false}
                    placeholder="Total Penggunaan Poin"
                    value={pointsUsed}
                    onChange={(e) => setPointsUsed(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  {/* <Link to="/nota/read"> */}
                    <Button
                      type="submit"
                      color="lightBlue"
                      size="lg"
                      ripple="light"
                      block
                    >
                      Bayar
                    </Button>
                  {/* </Link> */}
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
        <ToastContainer />
      </div>

      <FooterUser />
    </div>
  );
};

export default PembayaranPage;
