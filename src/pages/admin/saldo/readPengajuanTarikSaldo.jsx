import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faClose,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  showDataBahanBaku,
  deleteBahanBaku,
} from "../../../api/admin/BahanBakuApi";

const ReadPengajuanPenarikanSaldo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAccOpen, setIsModalAccOpen] = useState(false);
  const [selectedWD, setSelectedWD] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [bahanBakuData, setBahanBakuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataBahanBaku();
      setBahanBakuData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const openModal = (bahanBaku) => {
    setSelectedWD(bahanBaku);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWD(null);
    setIsModalOpen(false);
  };
  const openModalAcc = (bahanBaku) => {
    setSelectedWD(bahanBaku);
    setIsModalAccOpen(true);
  };

  const closeModalAcc = () => {
    setSelectedWD(null);
    setIsModalAccOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedWD) {
      console.error("No bahan baku selected");
      return;
    }

    console.log(selectedWD.id_bahan_baku);

    try {
      await deleteBahanBaku(selectedWD.id_bahan_baku); // Panggil deleteBahanBaku
      fetchData();
      console.log("Delete", selectedWD);
      closeModal();
      toast.success(`Berhasil menghapus ${selectedWD?.nama}`);
    } catch (error) {
      console.error("Error deleting bahan baku:", error);
      toast.error("Gagal Menghapus Bahan Baku");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const bahanBakuTableData = bahanBakuData.map((item) => ({
    id_bahan_baku: item.id_bahan_baku,
    nama: item.nama_bahan_baku,
    jumlahWD: item.stok_bahan_baku,
    tanggal: item.satuan_bahan_baku,
  }));
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

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Pengajuan Penarikan Saldo
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="ml-auto mt-1 mb-4 mr-4 w-56 flex justify-end items-center">
            <Input
              label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama User", "Jumlah Pengajuan", "Tanggal Pengajuan", ""].map(
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
                  ({ id_bahan_baku, nama, jumlahWD, tanggal }, key) => {
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
                            className=" text-[11px] font-semibold text-blue-gray-600"
                          >
                            {nama}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {jumlahWD}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {tanggal}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="btn-group text-center">
                            <Button
                              to=""
                              onClick={() =>
                                openModalAcc({
                                  id_bahan_baku,
                                  nama,
                                  jumlahWD,
                                  tanggal,
                                })
                              }
                              className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="mr-2"
                              />
                              Terima
                            </Button>

                            <Button
                              to=""
                              className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                              onClick={() =>
                                openModal({
                                  id_bahan_baku,
                                  nama,
                                  jumlahWD,
                                  tanggal,
                                })
                              }
                            >
                              <FontAwesomeIcon
                                icon={faClose}
                                className="mr-2"
                              />
                              Tolak
                            </Button>
                          </div>
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
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  } px-3 py-1 border border-gray-300 text-sm font-medium`}
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
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative w-96 bg-white rounded-lg p-4">
            <Typography variant="h6" className="mb-4">
              Tolak Pengajuan
            </Typography>
            <Typography className="text-gray-600 mb-4">
              Apakah anda yakin ingin Menolak Pengajuan dari {selectedWD?.nama}?
            </Typography>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                // onClick={handleDelete}
              >
                Yakin
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalAccOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative w-96 bg-white rounded-lg p-4">
            <Typography variant="h6" className="mb-4">
              Terima Pengajuan
            </Typography>
            <Typography className="text-gray-600 mb-4">
              Apakah anda yakin ingin Menerima Pengajuan dari {selectedWD?.nama}
              ?
            </Typography>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
                onClick={closeModalAcc}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                // onClick={handleDelete}
              >
                Yakin
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ReadPengajuanPenarikanSaldo;
