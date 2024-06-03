import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function StatisticsChart({ color, chart, title, description, footer }) {
  const navigate = useNavigate();

  // Mendapatkan peran pengguna dari penyimpanan sesi
  const userRole = sessionStorage.getItem("userRole");

  const handleButtonClick = (chartTitle) => {
    return () => {
      // Menahan akses berdasarkan peran pengguna
      if (userRole === "Manager Operasional" || userRole === "Owner") {
        switch (chartTitle) {
          case "Penjualan Bulanan":
            navigate("/penjualanBulanan");
            break;
          case "Penjualan Produk":
            navigate("/penjualanProduk");
            break;
          case "Stok Bahan Baku":
            navigate("/stokBahanBaku");
            break;
          case "Penggunaan Bahan Baku":
            navigate("/penggunaanBahanBaku");
            break;
          case "Presensi Pegawai":
            navigate("/presensiPegawai");
            break;
          case "Pemasukan Dan Pengeluaran":
            navigate("/pemasukanPengeluaran");
            break;
          case "Transaksi Penitip":
            navigate("/transaksiPenitip");
            break;
          default:
            navigate("/");
        }
        // Tambahkan logika untuk menampilkan pesan atau mengarahkan pengguna ke halaman lain yang sesuai
      }else {
        // Tampilkan pesan kesalahan
        toast.error("Anda tidak memiliki akses untuk melihat rincian.");
        console.log("Anda tidak memiliki akses untuk melihat rincian.");
        return;
      }
      
    };
  };

  return (
    <Card className="border border-blue-gray-100 shadow-sm">
      <CardHeader
        variant="gradient"
        color={color}
        floated={false}
        shadow={false}
        className="mb-4"
      >
        <Chart {...chart} />
      </CardHeader>
      <CardBody className="px-6 pt-0 pb-6">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600 mb-4">
          {description}
        </Typography>
        <Button
          onClick={handleButtonClick(title)}
          variant="gradient"
          color="blue"
          className="w-full"
        >
          Cek Rincian
        </Button>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    <ToastContainer/>
    </Card>
    
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
