import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { generateLaporanBulanan } from "../../api/admin/LaporanApi";
import CetakPenjualanBulanan from "../laporan/cetakPenjualanBulanan";

const ReadPenjualanBulanan = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [salesReport, setSalesReport] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    fetchSalesReport();
  }, [year]);

  const fetchSalesReport = async () => {
    setIsLoading(true);
    try {
      const response = await generateLaporanBulanan({ tahun: year });
      setSalesReport(response.laporan_bulanan);
      setTotalSales(response.total_akhir_penjualan);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching sales report:", error);
      toast.error("Gagal Mengambil Laporan Penjualan");
      setIsLoading(false);
    }
  };

  const handleViewPDF = () => {
    setShowPDFViewer(true);
  };

  const handleClosePDFViewer = () => {
    setShowPDFViewer(false);
  };
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        },
        autoSelected: 'zoom' 
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
      width: 2,
      lineCap: 'round',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#FDD835', '#F44336'], // Anda dapat menyesuaikan warna gradient
        shadeIntensity: 0.5,
        type: 'horizontal',
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    markers: {
      size: 4,
      colors: ['#FFC107'],
      strokeColor: '#FFA000',
      strokeWidth: 2,
      hover: {
        size: 7,
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `Rp ${value.toLocaleString()}`,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
    },
    xaxis: {
      categories: salesReport.map(data => data.bulan),
      type: 'category',
      labels: {
        rotate: -45,
        rotateAlways: true,
      }
    },
    yaxis: {
      title: {
        text: 'Total Penjualan (Rp)',
      }
    },
    colors: ["#388e3c"],
  };
  
  const series = [{
    name: 'Penjualan',
    data: salesReport.map(data => data.total_penjualan)
  }];
  

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 mr-10 ml-10">
      
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Laporan Penjualan Bulanan
          </Typography>
          <div className="flex items-center">
            <Input
              type="number"
              color="white"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mr-4"
              placeholder="Year"
              label="Tahun"
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {isLoading ? (
            <Typography className="text-center">Loading...</Typography>
          ) : (
            <>
            <div className="my-4">
                <ReactApexChart options={chartOptions} series={series} type="line" height={350} className="mr-10 ml-10"/>
              </div>
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
                      <CetakPenjualanBulanan
                        year={year}
                        salesReport={salesReport}
                        totalSales={totalSales}
                      />
                    }
                    fileName={`Laporan_Penjualan_Bulanan_${year}.pdf`}
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
                    <CetakPenjualanBulanan
                      year={year}
                      salesReport={salesReport}
                      totalSales={totalSales}
                    />
                  </PDFViewer>
                  
                </div>
              ) : (
                <table className="w-full min-w-[640px] table-auto mt-4">
                  <thead>
                    <tr>
                      {["Bulan", "Total Transaksi", "Total Penjualan"].map(
                        (el) => (
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
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {salesReport.length === 0 ? (
                      <tr>
                        <td
                          className="p-10 text-center text-xs font-semibold text-blue-gray-600"
                          colSpan="3"
                        >
                          Data Tidak Ditemukan
                        </td>
                      </tr>
                    ) : (
                      salesReport.map(
                        ({ bulan, total_transaksi, total_penjualan }, key) => {
                          const className = `py-3 px-5 ${
                            key === salesReport.length - 1
                              ? ""
                              : "border-b border-blue-gray-50"
                          }`;

                          return (
                            <tr key={bulan}>
                              <td className={className}>
                                <Typography
                                  variant="small"
                                  className="text-[11px] font-semibold text-blue-gray-600"
                                >
                                  {bulan}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {total_transaksi}
                                </Typography>
                              </td>
                              <td className={className}>
                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                  {total_penjualan.toLocaleString("id-ID")}
                                </Typography>
                              </td>
                            </tr>
                          );
                        }
                      )
                    )}
                  </tbody>
                </table>
              )}
              <div className="mt-4">
                <Typography className="text-right text-lg font-semibold ml-auto mr-10">
                  Total Penjualan Tahun {year}:{" "}
                  {totalSales.toLocaleString("id-ID")}
                </Typography>
              </div>

              
            </>
          )}
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ReadPenjualanBulanan;
