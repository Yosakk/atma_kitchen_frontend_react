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
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { pegawaiTableData } from "../../../data/pegawaiTableData";
import { showDataPegawai } from "../../../api/mo/PegawaiApi";

const readGajiPegawai = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Gaji dan Bonus Pegawai
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
                    className="p-10 text-center text-xs font-semibold text-blue-gray-600"
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
                            <Link to={`/owner/gajiPegawai/edit/${id}`}>
                              <Button className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="mr-2"
                                />
                                Ubah
                              </Button>
                            </Link>
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
    </div>
  );
};

export default readGajiPegawai;
