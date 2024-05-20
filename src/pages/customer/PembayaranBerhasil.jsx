import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import AnimationPage from "../../assets/images/Animation - 1716104307179.json";
import { Button } from "@material-tailwind/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CetakNota from "./CetakNota";
import { showDataNota } from "../../api/customer/TransaksiApi";

function PembayaranBerhasil() {
  let { id } = useParams();
  console.log("masuk nota", id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pointsUsed = queryParams.get("pointsUsed");
  

  const [showPDF, setShowPDF] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [notaData, setNotaData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataNota(id);
      // console.log("cek cek",response.data);
      setNotaData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };


  const handleCetakNota = () => {
    // saveDataToLocalStorage();
    // setShowPDF(true);
    setTimeout(() => {
      // Open a new tab with the same path
      window.open(`/pembayaran/cetaknotaPDF/${id}?pointsUsed=${pointsUsed}`, "_blank");
    }, 200);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 w-full">
        <div className="flex w-full justify-center max-w-6xl">
          <div className="flex w-full">
            <div className="w-1/2 flex flex-col items-center px-4">
              <Lottie
                animationData={AnimationPage}
                loop={true}
                autoplay={true}
                style={{ width: 300, height: 300 }}
              />
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold">Pembayaran Berhasil</h2>
                <p>Silahkan Tunggu Konfirmasi Pembayaran Dari Admin </p>
                <p>Points Used: {pointsUsed}</p>
              </div>
              {!showPDF && (
                <div className="w-full flex justify-center mt-4">
                  <Link to="/home" className="w-full max-w-md">
                    <Button className="w-full">Back To Home Page</Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center px-4">
              <CetakNota/>
              {!showPDF && (
                <div className="w-full flex justify-center mt-4">
                  <Button
                    className="w-full"
                    onClick={handleCetakNota}
                  >
                    Cetak Nota
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PembayaranBerhasil;
