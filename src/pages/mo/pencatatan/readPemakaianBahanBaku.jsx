import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Input,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showDataBahanBaku } from "../../../api/admin/BahanBakuApi";
import { showPemakaianBahanBaku } from "../../../api/mo/PemakaianBahanBaku";

const ReadPemakaianBahanBaku = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [pemakaianBahanData, setPemakaianBahanData] = useState([]);
  const [bahanBakuData, setBahanBakuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchDataBahanBaku();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showPemakaianBahanBaku();
      setPemakaianBahanData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const fetchDataBahanBaku = async () => {
    try {
      const response = await showDataBahanBaku();
      setBahanBakuData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const getBahanBakuName = (idBahanBaku) => {
    const bahanBaku = bahanBakuData.find(
      (bahanBaku) => bahanBaku.id_bahan_baku === idBahanBaku
    );
    return bahanBaku ? bahanBaku.nama_bahan_baku : "Unknown Bahan Baku";
  };

  const getBahanBakuSatuan = (idBahanBaku) => {
    const bahanBaku = bahanBakuData.find(
      (bahanBaku) => bahanBaku.id_bahan_baku === idBahanBaku
    );
    return bahanBaku ? bahanBaku.satuan_bahan_baku : "Unknown Satuan";
  };
  const pemakaianBahanBakuTableData = pemakaianBahanData.map((item) => ({
    id_pembelian_bahan: item.id_pembelian_bahan,
    namaBahanBaku: getBahanBakuName(item.id_bahan_baku),
    jumlahPemakaian: item.jumlah_pemakaian,
    tanggalPemakaian: item.tanggal_pemakaian,
    satuan: getBahanBakuSatuan(item.id_bahan_baku),
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pemakaianBahanBakuTableData
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    pemakaianBahanBakuTableData.length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageLimit = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + maxPageLimit - 1, totalPages);
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    return pageNumbers.map((number, index) => (
      <button
        key={index}
        onClick={() => paginate(number)}
        className={`${
          currentPage === number
            ? "bg-blue-500 text-white"
            : number === "..."
            ? "text-gray-500"
            : "bg-white text-gray-700"
        } px-3 py-1 border border-gray-300 text-sm font-medium`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Pencatatan Pemakaian Bahan Baku
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="ml-auto mt-1 mb-4 mr-4 w-56 flex justify-end items-center">
            <Input
              label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
            />
          </div>
          <table className="w-full min-w-[1000px] table-auto">
            <thead>
              <tr>
                {[
                  "Nama Bahan Baku",
                  "Jumlah Pemakaian",
                  "Satuan",
                  "Tanggal Pemakaian",
                  "",
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
              {currentItems.length === 0 ? (
                <tr>
                  <td
                    className=" p-10 text-center text-xs font-semibold text-blue-gray-600"
                    colSpan="9"
                  >
                    Data Tidak Ditemukan
                  </td>
                </tr>
              ) : (
                currentItems.map(
                  (
                    {
                      id_pembelian_bahan,
                      namaBahanBaku,
                      jumlahPemakaian,
                      tanggalPemakaian,
                      satuan,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${key === currentItems.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={id_pembelian_bahan}>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {namaBahanBaku}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {jumlahPemakaian}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {satuan}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {tanggalPemakaian}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end">
            <nav className="relative z-0 inline-flex">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              {renderPageNumbers()}
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

export default ReadPemakaianBahanBaku;
