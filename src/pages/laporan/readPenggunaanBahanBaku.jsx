import React, { useState, useEffect, useCallback } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import ReactApexChart from "react-apexcharts";
import { generateLaporanPenggunaanBahanBaku } from "../../api/admin/LaporanApi";
import CetakPenggunaanBahan from "./cetakPenggunaanBahan";

// Function to format date to yyyy-mm-dd
const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// Get today's date and yesterday's date
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const ReadPenggunaanBahanBaku = () => {
  const [tanggalAwal, setTanggalAwal] = useState(formatDate(yesterday));
  const [tanggalAkhir, setTanggalAkhir] = useState(formatDate(today));
  const [isLoading, setIsLoading] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [penggunaanBahanData, setPenggunaanBahanData] = useState([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await generateLaporanPenggunaanBahanBaku({
        tanggal_awal: tanggalAwal,
        tanggal_akhir: tanggalAkhir,
      });
      setPenggunaanBahanData(response.laporan_penggunaan_bahan_baku);
      setIsLoading(false);
    } catch (error) {
      setPenggunaanBahanData([]);
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }, [tanggalAwal, tanggalAkhir]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTanggalAwalChange = (e) => {
    setTanggalAwal(e.target.value);
  };

  const handleTanggalAkhirChange = (e) => {
    setTanggalAkhir(e.target.value);
  };

  const handleViewPDF = () => {
    setShowPDFViewer(true);
  };

  const handleClosePDFViewer = () => {
    setShowPDFViewer(false);
  };

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: penggunaanBahanData.map((data) => data.nama_bahan_baku),
    },
    yaxis: {
      title: {
        text: "Jumlah Penggunaan",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "Jumlah Penggunaan",
      data: penggunaanBahanData.map((data) => data.total_jumlah_pemakaian),
    },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 mx-10">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Laporan Penggunaan Bahan Baku
          </Typography>
          <div className="flex items-center gap-4">
            <Input
              type="date"
              color="white"
              value={tanggalAwal}
              onChange={handleTanggalAwalChange}
              className="mr-4"
              placeholder="Tanggal Awal"
              label="Tanggal Awal"
            />
            <Input
              type="date"
              color="white"
              value={tanggalAkhir}
              onChange={handleTanggalAkhirChange}
              className="mr-4"
              placeholder="Tanggal Akhir"
              label="Tanggal Akhir"
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {isLoading ? (
            <Typography className="text-center">Loading...</Typography>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-end items-center gap-4 p-4">
                {showPDFViewer && (
                  <div className="">
                    <Button
                      color="red"
                      buttonType="filled"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      className="py-2 px-4 mr-10"
                      onClick={handleClosePDFViewer}
                    >
                      Close PDF
                    </Button>
                  </div>
                )}
                <Button
                  color="green"
                  buttonType="filled"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  className="py-2 px-4 ml-5 mr-5"
                  onClick={handleViewPDF}
                >
                  View PDF
                </Button>
                <Button
                  color="blue"
                  buttonType="filled"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  className="py-2 px-4"
                >
                  <PDFDownloadLink
                    document={
                      <CetakPenggunaanBahan
                        tanggalAwal={tanggalAwal}
                        tanggalAkhir={tanggalAkhir}
                        penggunaanBahanData={penggunaanBahanData}
                      />
                    }
                    fileName={`Laporan_Penggunaan_Bahan_Baku_${tanggalAwal}_${tanggalAkhir}.pdf`}
                  >
                    {({ loading }) =>
                      loading ? "Loading document..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                </Button>
              </div>
              {showPDFViewer ? (
                <div className="relative">
                  <PDFViewer width="100%" height="600px">
                    <CetakPenggunaanBahan
                      tanggalAwal={tanggalAwal}
                      tanggalAkhir={tanggalAkhir}
                      penggunaanBahanData={penggunaanBahanData}
                    />
                  </PDFViewer>
                </div>
              ) : (
                <>
                  <div className="my-4">
                    <ReactApexChart
                      options={chartOptions}
                      series={series}
                      type="bar"
                      height={350}
                    />
                  </div>
                  <table className="w-full min-w-[640px] table-auto mt-4">
                    <thead>
                      <tr>
                        {["Nama Bahan", "Satuan", "Digunakan"].map((el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-5 text-left"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-bold uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {penggunaanBahanData.length > 0 ? (
                        penggunaanBahanData.map((item, key) => {
                          const className = `py-3 px-5 ${
                            key === penggunaanBahanData.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                          }`;

                          return (
                            <tr key={item.nama_bahan_baku}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  className="text-[11px] font-semibold text-blue-gray-600"
                                >
                                  {item.nama_bahan_baku}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {item.satuan_bahan_baku}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {item.total_jumlah_pemakaian}
                                </Typography>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            className="p-10 text-center text-xs font-semibold text-blue-gray-600"
                            colSpan="3"
                          >
                            Data Tidak Ditemukan
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ReadPenggunaanBahanBaku;
