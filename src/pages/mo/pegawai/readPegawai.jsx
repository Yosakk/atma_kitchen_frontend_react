import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { pegawaiTableData } from "../../../data/pegawaiTableData";
import { showDataPegawai, deletePegawai } from "../../../api/mo/PegawaiApi";
const AddButton = () => {
  return (
    <Link to="/mo/pegawai/add">
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tambah
      </button>
    </Link>
  );
};
const readPegawai = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [pegawaiData, setPegawaiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataPegawai();
      setPegawaiData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const pegawaiTableData = pegawaiData.map((item) => ({
    id: item.id,
    username: item.username,
    nama: item.nama_user,
    email: item.email,
    jenisKelamin: item.gender,
    tanggalLahir: item.tanggal_lahir,
    NoTelepon: item.nomor_telepon,
    gaji: item.pegawai ? item.pegawai.gaji : null,
    bonus: item.pegawai ? item.pegawai.bonus_gaji : null,
  }));

  const openModal = (pegawai) => {
    setSelectedPegawai(pegawai);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPegawai(null);
    setIsModalOpen(false);
  };

  // const handleDelete = () => {
  //   // Handle delete logic here
  //   console.log("Delete", selectedPegawai);
  //   closeModal();
  // };
  const handleDelete = async () => {
    if (!selectedPegawai) {
      console.error("No bahan baku selected");
      return;
    }

    console.log("masuk",selectedPegawai.id);

    try {
      await deletePegawai(selectedPegawai.id); // Panggil deletePegawai
      fetchData();
      console.log("Delete", selectedPegawai);
      closeModal();
      toast.success(`Berhasil menghapus ${selectedPegawai?.nama}`);
      
    } catch (error) {
      console.error("Error deleting Pegawai :", error);
      toast.error("Gagal Menghapus Pegawai");
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pegawaiTableData
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pegawaiTableData.length / itemsPerPage);

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
            Pegawai
          </Typography>
          <AddButton />
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="ml-auto mt-1 mb-4 mr-4 w-56 flex justify-end items-center">
            <Input
              label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <table className="w-full min-w-[1150px] table-auto">
            <thead>
              <tr>
                {[
                  "Username",
                  "Nama Pegawai",
                  "Email",
                  "Jenis Kelamin",
                  "Tanggal Lahir",
                  "Nomor Telepon",
                  "Gaji",
                  "Bonus Gaji",
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
                      nama,
                      email,
                      jenisKelamin,
                      tanggalLahir,
                      NoTelepon,
                      gaji,
                      bonus,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === pegawaiTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={id}>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {username}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {nama}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {email}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {jenisKelamin}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {tanggalLahir}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {NoTelepon}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {gaji}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {bonus}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="btn-group text-center">
                            <Link
                              to={{
                                pathname: "/mo/pegawai/edit",
                              }}
                            >
                              <Button
                                to="edit"
                                className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="mr-2"
                                />
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
                                  nama,
                                  email,
                                  jenisKelamin,
                                  tanggalLahir,
                                  NoTelepon,
                                  gaji,
                                  bonus,
                                })
                              }
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="mr-2"
                              />
                              Hapus
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
              Hapus Pegawai
            </Typography>
            <Typography className="text-gray-600 mb-4">
              Apakah anda yakin ingin menghapus Pegawai{" "}
              {selectedPegawai?.username}?
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
      <ToastContainer/>
    </div>
  );
};

export default readPegawai;
