import React, { useState, useEffect, useReducer } from "react";
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
import { showPoin } from "../../api/customer/PembayaranApi";
import { storePembayaran } from "../../api/customer/PembayaranApi";

const formReducer = (state, event) => {
  if (event.target.type === "file") {
    return {
      ...state,
      [event.target.name]: event.target.files[0],
    };
  }

  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const PembayaranPage = () => {
  let { id } = useParams();
  console.log("masukparams", id);

  // Harga barang atau layanan

  const [file, setFile] = useState(null);
  const [pointsUsed, setPointsUsed] = useState("");
  const [formData, setFormData] = useReducer(formReducer, {});
  const [totalPembayaran, setTotalPembayaran] = useState([]);
  const hargaBarang = totalPembayaran;
  const nilaiSatuPoin = 100;
  const [totalProduk, setTotalProduk] = useState([]);
  const [biayaPengriman, setBiayaPengriman] = useState([]);
  const [poinDiperoleh, setPoinDiperoleh] = useState(0);
  const [totalSetelahPoin, setTotalSetelahPoin] = useState(hargaBarang);
  const [sisaPoin, setSisaPoin] = useState([]);
  const [totalPoinSebelumnya, setTotalPoinSebelumnya] = useState(10);
  const navigate = useNavigate();
  const [poin, setPoin] = useState([]);

  const fetchData = async () => {
    try {
      const response = await showPoin(id);
      const totalHarga = response.data.biaya_pengiriman + response.data.total_pembayaran;
      setPoin(response.poin);
      setBiayaPengriman(response.data.biaya_pengiriman)
      setTotalPembayaran(totalHarga)
      setTotalProduk(response.data.total_pembayaran)
      setSisaPoin(response.data.user.poin)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Perhitungan total harga setelah dikurangi dengan penggunaan poin
    const totalSetelahPoin = totalPembayaran - pointsUsed * nilaiSatuPoin;
    setTotalSetelahPoin(totalSetelahPoin);
  }, [pointsUsed]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan validasi di sini
    // Misalnya, pastikan file sudah dipilih dan total penggunaan poin tidak melebihi poin yang dimiliki oleh pengguna
    // Jika validasi berhasil, lakukan pengiriman data ke backend atau lakukan tindakan sesuai kebutuhan
    const point = pointsUsed;
    console.log(pointsUsed);
    const finalFormData = {
      ...formData,
      point
    };
    storePembayaran(id, finalFormData)
      .then((res) => {
        toast.success("Pembayaran Produk berhasil!");
        setTimeout(() => {
          navigate("/nota/read")
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (!file) {
          toast.error("Silakan pilih gambar bukti pembayaran.");
          return;
        }
      })

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
                <div className="mb-4 grid grid-cols-2">
                  <div>
                    <label
                      htmlFor="nama_bahan_baku"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Total Harga Produk
                    </label>
                    <p className="text-blue text-lg">Rp {totalProduk.toLocaleString("id-ID")}</p>
                  </div>
                  <div>
                    <label
                      htmlFor="biaya_pengiriman"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Biaya Pengiriman
                    </label>
                    <p className="text-blue text-lg">Rp {biayaPengriman.toLocaleString("id-ID")}</p>
                  </div>

                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Total Pembayaran
                  </label>
                  <p className="text-blue text-lg">Rp {totalPembayaran.toLocaleString("id-ID")}</p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Poin yang Diperoleh
                  </label>
                  <p className="text-blue text-lg">{poin} Poin</p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama_bahan_baku"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Total Setelah Poin
                  </label>
                  <p className="text-blue text-lg">Rp {totalSetelahPoin.toLocaleString("id-ID")}</p>
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
                    name="bukti_pembayaran"
                    color="lightBlue"
                    size="regular"
                    label="Bukti Pembayaran"
                    outline={false}
                    placeholder="Upload Gambar Bukti Pembayaran"
                    onChange={setFormData}
                    required
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
                    name="point"
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
