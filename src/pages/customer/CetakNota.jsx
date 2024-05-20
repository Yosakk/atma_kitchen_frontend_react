import React, { useState, useEffect } from "react";
import { showDataNota } from "../../api/customer/TransaksiApi";
import Lottie from "lottie-react";
import AnimationPage from "../../assets/images/Animation - 1716104307179.json";
import { Button } from "@material-tailwind/react";
import { useLocation, useParams } from "react-router-dom";

function CetakNota() {
  let { id } = useParams();
  console.log("masuk Cetak", id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pointsUsed = queryParams.get("pointsUsed");
  const [isLoading, setIsLoading] = useState(true);
  const [notaData, setNotaData] = useState(null);
  const idTransaksi = useState(id);
  const nilaiPoin = pointsUsed * 100;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataNota(idTransaksi);
      setNotaData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-xl px-4">
      {isLoading ? (
        <div className="text-center mt-8">Loading...</div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-700">Atma Kitchen</h2>
            <p className="text-sm text-gray-500">
              Jl. Centralpark No. 10 Yogyakarta
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <strong>No Nota:</strong> {notaData.nomor_nota}
              </p>
              <p className="text-sm">
                <strong>Tanggal pesan:</strong> {notaData.tanggal_transaksi}
              </p>
              <p className="text-sm">
                <strong>Lunas pada:</strong> {notaData.pembayaran.tanggal_pembayaran}
              </p>
              <p className="text-sm">
                <strong>Tanggal ambil:</strong> {notaData.tanggal_pengambilan}
              </p>
            </div>

            <div>
              <p className="text-sm">
                <strong>Customer:</strong>
                {notaData.user_by_pelanggan.nama_user}
              </p>
              <p className="text-sm">{notaData.user_by_pelanggan.email}</p>
              <p className="text-sm">
                {notaData.user_by_pelanggan.nomor_telepon}
              </p>
              {/* <p className="text-sm">
                {notaData.user.alamat[0].detail_alamat}
              </p> */}
              <p className="text-sm">{notaData.alamat_pengiriman}</p>
              <p className="text-sm">
                <strong>Delivery:</strong> {notaData.jenis_pengiriman}
                {notaData.jenis_pengiriman === "Diantar" &&
                  " Kurir Atma Kitchen"}
              </p>
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* Detail transaksi */}
              {notaData.detail_transaksi.map((item, index) => {
                // Cek jika nama_produk tidak ditemukan, lakukan pencarian nama_produk_hampers
                const namaProduk = item.produk
                  ? item.produk.nama_produk
                  : item.produk_hampers
                  ? item.produk_hampers.nama_produk_hampers
                  : "Produk tidak ditemukan";

                return (
                  <p className="text-sm" key={index}>
                    <strong>
                      {item.jumlah_produk} x {namaProduk}
                    </strong>
                  </p>
                );
              })}
            </div>
            <div>
              {/* Detail transaksi */}
              {notaData.detail_transaksi.map((item, index) => (
                <p className="text-sm" key={index}>
                  Rp.{item.total_harga_transaksi.toLocaleString("id-ID")}
                </p>
              ))}
            </div>
          </div>

          <hr className="my-4" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              {/* <div>
                <p className="text-sm">
                  <strong>Potongan 120 poin:</strong>{" "}
                  {notaData.user_by_pelanggan.poin}
                </p>
                <p className="text-sm">
                  <strong>Total Pembayaran:</strong> {notaData.total_pembayaran}
                </p>
                <p className="text-sm">
                  <strong>Ongkos Kirim (rad. 5 km):</strong>{" "}
                  {notaData.biaya_pengiriman}
                </p>
              </div> */}
            </div>

            <div>
              {/* <p className="text-sm">
                <strong>Poin dari pesanan ini:</strong>{" "}
                {notaData.user_by_pelanggan.poin}
              </p>
              <p className="text-sm">
                <strong>Total poin customer:</strong>{" "}
                {notaData.user_by_pelanggan.poin}
              </p> */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <strong>Poin dari pesanan ini:</strong> {notaData.pembayaran.poin_reward}
              </p>
              <p className="text-sm">
                <strong>Total poin customer:</strong> {notaData.user.poin}
              </p>
            </div>
            <div>
              <div>
                <p className="text-sm">
                  <strong>Potongan {pointsUsed} poin:</strong> -{nilaiPoin.toLocaleString("id-ID")}
                </p>
                
                <p className="text-sm">
                  <strong>Biaya Pengiriman:</strong>
                  Rp.{notaData.biaya_pengiriman.toLocaleString("id-ID")}
                </p>
                <p className="text-sm">
                  <strong>Total Pembayaran:</strong> Rp.{notaData.total_pembayaran.toLocaleString("id-ID") - nilaiPoin.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            {/* <Button color="indigo" ripple="light"className="w-full"
                    onClick={handleCetakNota}>
              Cetak Nota
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default CetakNota;
