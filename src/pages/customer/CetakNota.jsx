import React from "react";
import Lottie from "lottie-react";
import AnimationPage from "../../assets/images/Animation - 1716104307179.json";

function CetakNota() {
  return (
    <>
      <div className="flex justify-center mt-8"> {/* Menggunakan flex dan justify-center */}
        <Lottie
          animationData={AnimationPage}
          loop={true}
          autoplay={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
      <div className="max-w-xl mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Atma Kitchen</h2>
          <p className="text-sm">Jl. Centralpark No. 10 Yogyakarta</p>
        </div>

        {/* Animasi Lottie */}

        <div className="mt-4">
          <p className="text-sm">
            <strong>No Nota:</strong> 24.02.101
          </p>
          <p className="text-sm">
            <strong>Tanggal pesan:</strong> 15/2/2024 18:50
          </p>
          <p className="text-sm">
            <strong>Lunas pada:</strong> 15/2/2024 19:01
          </p>
          <p className="text-sm">
            <strong>Tanggal ambil:</strong> 18/2/2024 09:00
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm">
            <strong>Customer:</strong> cath123@gmail.com / Catherine
          </p>
          <p className="text-sm">Perumahan Griva Persada XII/20</p>
          <p className="text-sm">Caturtunggal, Depok, Sleman</p>
          <p className="text-sm">
            <strong>Delivery:</strong> Kurir Atma Kitchen
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm">
            <strong>1 Hampers Paket A</strong> 650.000
          </p>
          <p className="text-sm">
            <strong>1 Keripik Kentang 250 gr</strong> 75.000
          </p>
        </div>

        <div className="mt-4 border-t border-gray-300 pt-4">
          <p className="text-sm">
            <strong>Total:</strong> 725.000
          </p>
          <p className="text-sm">
            <strong>Ongkos Kirim (rad. 5 km):</strong> 10.000
          </p>
          <p className="text-sm">
            <strong>Total:</strong> 735.000
          </p>
          <p className="text-sm">
            <strong>Potongan 120 poin:</strong> -12.000
          </p>
          <p className="text-sm">
            <strong>Total:</strong> 723.000
          </p>
        </div>

        <div className="mt-4 border-t border-gray-300 pt-4">
          <p className="text-sm">
            <strong>Poin dari pesanan ini:</strong> 106
          </p>
          <p className="text-sm">
            <strong>Total poin customer:</strong> 110
          </p>
        </div>
      </div>
    </>
  );
}

export default CetakNota;
