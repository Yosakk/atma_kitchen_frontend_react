import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Input,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { pengeluaranLainTableData } from "../../../data/PengeluaranLainTableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { showDataPengeluaranLain, deletePengeluaranLain } from "../../../api/mo/PengeluaranLainApi";
import { showDataUser } from "../../../api/mo/UserApi";

const AddButton = () => {
  return (
    <Link to="/mo/pencatatanPengeluaranLain/add">
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tambah
      </button>
    </Link>
  );
};

const ReadPencatatanPengeluaranLain = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPengeluaranLain, setSelectedPengeluaranLain] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [pengeluaranLainData, setPengeluaranLainData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchDataUser();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataPengeluaranLain();
      setPengeluaranLainData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const fetchDataUser = async () => {
    try {
      const response = await showDataUser();
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const getUserName = (idUser) => {
    const user = userData.find((user) => user.id === idUser);
    return user ? user.username : "Unknown Username";
  };
  const pengeluaranLainTableData = pengeluaranLainData.map((item) => ({
    id: item.id_pengeluaran_lain,
    username: getUserName(item.id_user),
    namaPengeluaran: item.nama_pengeluaran,
    jumlahPengeluaran: item.jumlah_pengeluaran,
    hargaSatuan: item.jumlah_pengeluaran,
    totalPengeluaran: item.total_pengeluaran,
    tanggalPengeluaran: item.tanggal_pengeluaran,
  }));
  const openModal = (pengeluaranLain) => {
    setSelectedPengeluaranLain(pengeluaranLain);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPengeluaranLain(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedPengeluaranLain) {
      console.error("No bahan baku selected");
      return;
    }

    console.log("masuk",selectedPengeluaranLain.id);

    try {
      await deletePengeluaranLain(selectedPengeluaranLain.id); // Panggil deleteBahanBaku
      fetchData();
      console.log("Delete", selectedPengeluaranLain);
      closeModal();
      toast.success(`Berhasil menghapus Pengeluaran ${selectedPengeluaranLain?.namaPengeluaran}`);
    } catch (error) {
      console.error("Error deleting Pengeluaran Lain:", error);
      toast.error("Gagal Menghapus Pengeluaran");
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setFilteredData(
      pengeluaranLainTableData.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    );
  }, [searchValue]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pengeluaranLainTableData
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pengeluaranLainTableData.length / itemsPerPage);

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
            Pencatatan Pengeluaran Lain
          </Typography>
          <AddButton />
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="ml-auto mt-1 mb-4 mr-4 w-56 flex justify-end items-center">
            <Input label="Search" value={searchValue} onChange={handleSearch} />
          </div>
          <table className="w-full min-w-[1100px] table-auto">
            <thead>
              <tr>
                {[
                  "Username",
                  "Nama Pengeluaran",
                  "Jumlah Pengeluaran",
                  // "Harga Satuan",
                  "Total Pengeluaran",
                  "Tanggal Pengeluaran",
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
                      id,
                      username,
                      namaPengeluaran,
                      // hargaSatuan,
                      totalPengeluaran,
                      tanggalPengeluaran,
                    },
                    key
                  ) => (
                    <tr key={id}>
                      <td className="border-b border-blue-gray-50 py-3 px-5 text-[11px] font-semibold text-blue-gray-600">
                        {username}
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                        {namaPengeluaran}
                      </td>
                      {/* <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                        {hargaSatuan}
                      </td> */}
                      <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                        {totalPengeluaran}
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                        {tanggalPengeluaran}
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-5 text-xs font-semibold text-blue-gray-600">
                        <div className="btn-group text-center">
                          <Link to="/mo/pencatatanPengeluaranLain/edit">
                            <Button className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                              <FontAwesomeIcon icon={faEdit} className="mr-2" />
                              Ubah
                            </Button>
                          </Link>
                          <Button
                            to=""
                            className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                            onClick={() =>
                              openModal({
                                id,
                                username,
                                namaPengeluaran,
                                jumlahPengeluaran,
                                // hargaSatuan,
                                totalPengeluaran,
                                tanggalPengeluaran,
                              })
                            }
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
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
              Hapus Pencatatan Pengeluaran
            </Typography>
            <Typography className="text-gray-600 mb-4">
              Apakah anda yakin ingin Menghapus Pengeluaran{" "}
              {selectedPengeluaranLain?.namaPengeluaran}?
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
                onClick={handleDelete}
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

export default ReadPencatatanPengeluaranLain;
