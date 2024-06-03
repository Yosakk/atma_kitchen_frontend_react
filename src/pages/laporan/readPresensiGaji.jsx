import React, { useState, useEffect } from "react";
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
import { generateLaporanPresensiPegawai } from "../../api/admin/LaporanApi";
import CetakPresensiGaji from "./cetakPresensiGaji";

const ReadPresensiGaji = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [presensiData, setPresensiData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [year, month]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await generateLaporanPresensiPegawai({
        tahun: year,
        bulan: month,
      });
      setPresensiData(response.data);
      setIsLoading(false);
    } catch (error) {
      setPresensiData([]);
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setPresensiData([]); // Mengosongkan presensiData saat mengubah tahun
    fetchData();
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setPresensiData([]); // Mengosongkan presensiData saat mengubah bulan
    fetchData();
  };

  const handleViewPDF = () => {
    setShowPDFViewer(true);
  };

  const handleClosePDFViewer = () => {
    setShowPDFViewer(false);
  };

  const getMonthName = (month) => {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return monthNames[month - 1];
  };

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
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
      categories: presensiData.map((data) => data.nama_pegawai),
    },
    yaxis: {
      title: {
        text: "Jumlah",
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#00E396", "#FF4560"],
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  const series = [
    {
      name: "Jumlah Hadir",
      data: presensiData.map((data) => data.jumlah_hadir),
    },
    {
      name: "Jumlah Alpa",
      data: presensiData.map((data) => data.jumlah_alpa),
    },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 mr-10 ml-10">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Laporan Presensi dan Gaji Pegawai
          </Typography>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              color="white"
              value={year}
              onChange={handleYearChange}
              className="mr-4"
              placeholder="Year"
              label="Tahun"
            />
            <Input
              type="number"
              color="white"
              value={month}
              onChange={handleMonthChange}
              className="mr-4"
              placeholder="Month"
              label="Bulan"
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
                      <CetakPresensiGaji
                        year={year}
                        month={month}
                        presensiData={presensiData} // Menggunakan presensiData sebagai presensiData
                      />
                    }
                    fileName={`Laporan_Presensi_Gaji_Pegawai_${getMonthName(
                      month
                    )}_${year}.pdf`}
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
                    <CetakPresensiGaji
                      year={year}
                      month={month}
                      presensiData={presensiData} // Menggunakan presensiData sebagai presensiData
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
                      className="mr-10 ml-10"
                    />
                  </div>
                  <table className="w-full min-w-[640px] table-auto mt-4">
                    <thead>
                      <tr>
                        {[
                          "Nama Pegawai",
                          "Jumlah Hadir",
                          "Jumlah Alpa",
                          "Honor Harian",
                          "Bonus Rajin",
                          "Total Honor",
                        ].map((el) => (
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
                      {presensiData.length > 0 ? (
                        presensiData.map((item, key) => {
                          const className = `py-3 px-5 ${
                            key === presensiData.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                          }`;

                          return (
                            <tr key={item.nama_pegawai}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  className="text-[11px] font-semibold text-blue-gray-600"
                                >
                                  {item.nama_pegawai}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {item.jumlah_hadir}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {item.jumlah_alpa}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {item.honor_harian.toLocaleString("id-ID")}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {item.bonus_rajin
                                    ? item.bonus_rajin.toLocaleString("id-ID")
                                    : "-"}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {item.total_honor.toLocaleString("id-ID")}
                                </Typography>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            className="p-10 text-center text-xs font-semibold text-blue-gray-600"
                            colSpan="6"
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

export default ReadPresensiGaji;
