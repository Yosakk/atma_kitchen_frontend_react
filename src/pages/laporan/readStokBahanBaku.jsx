import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Typography, Button, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { generateLaporanStokBahanBaku } from "../../api/admin/LaporanApi";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import CetakStokBahanBaku from "./cetakStokBahanBaku";
import ReactApexChart from "react-apexcharts";  // Import ReactApexChart

const ReadBahanBaku = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [bahanBakuData, setBahanBakuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await generateLaporanStokBahanBaku();
      setBahanBakuData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const bahanBakuTableData = bahanBakuData.map((item) => ({
    id_bahan_baku: item.id_bahan_baku,
    nama: item.nama_bahan_baku,
    stok: item.stok_bahan_baku,
    satuan: item.satuan_bahan_baku,
  }));

  const handleViewPDF = () => setShowPDFViewer(true);
  const handleClosePDFViewer = () => setShowPDFViewer(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bahanBakuTableData
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bahanBakuTableData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      categories: bahanBakuTableData.map((data) => data.nama),
    },
    yaxis: {
      title: {
        text: "Stok",
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "Stok",
      data: bahanBakuTableData.map((data) => data.stok),
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
            Stok Bahan Baku
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="ml-auto mt-1 mb-4 mr-4 w-56 flex justify-end items-center">
            <Input
              label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
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
                  document={<CetakStokBahanBaku data={bahanBakuTableData} />}
                  fileName={`Laporan_Stok_Bahan_Baku.pdf`}
                >
                  {({ loading }) =>
                    loading ? "Loading document..." : "Download PDF"
                  }
                </PDFDownloadLink>
              </Button>
            </div>
          </div>
          {isLoading ? (
            <Typography className="text-center">Loading...</Typography>
          ) : (
            <>
              {showPDFViewer ? (
                <div className="relative z-50">
                  <PDFViewer width="100%" height="500px">
                    <CetakStokBahanBaku data={bahanBakuTableData} />
                  </PDFViewer>
                </div>
              ) : (
                <div className="my-4">
                  <ReactApexChart
                    options={chartOptions}
                    series={series}
                    type="bar"
                    height={350}
                    className="mr-10 ml-10"
                  />
                </div>
              )}
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Nama Bahan Baku", "Stok"].map((el) => (
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
                  {currentItems.length === 0 ? (
                    <tr>
                      <td
                        className="p-10 text-center text-xs font-semibold text-blue-gray-600"
                        colSpan="3"
                      >
                        Data Tidak Ditemukan
                      </td>
                    </tr>
                  ) : (
                    currentItems.map(
                      ({ id_bahan_baku, nama, stok, satuan }, key) => {
                        const className = `py-3 px-5 ${
                          key === currentItems.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;
                        return (
                          <tr key={id_bahan_baku}>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-[11px] font-semibold text-blue-gray-600"
                              >
                                {nama}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {stok} {satuan}
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )
                  )}
                </tbody>
              </table>
            </>
          )}
          <div className="mt-4 flex justify-end">
            <nav className="relative z-0 inline-flex">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 border border-gray-300 text-sm font-medium ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 mr-4"
              >
                Next
              </button>
            </nav>
          </div>
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ReadBahanBaku;
