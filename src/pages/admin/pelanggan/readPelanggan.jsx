import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Input,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { pelangganTableData } from "../../../data/pelangganTableData";
import { showDataPelanggan } from "../../../api/admin/PelangganApi";

const ReadPelanggan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage] = useState(5);
  // const totalPage = Math.ceil(pelangganTableData.length / itemsPerPage);
  const [pelangganData, setPelangganData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataPelanggan();
      setPelangganData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const pelangganTableData = pelangganData.map((item) => ({
    id: item.id,
    username: item.username,
    nama: item.nama_user,
    email: item.email,
    jenisKelamin: item.gender,
    tanggalLahir: item.tanggal_lahir,
    nomorTelepon: item.nomor_telepon,
    // gaji: item.pegawai ? item.pegawai.gaji : null,
    // bonus: item.pegawai ? item.pegawai.bonus_gaji : null,
    img: "/img/team-2.jpeg",
    poin: item.pelanggan ? item.pelanggan.poin : null,
    atmaWallet: item.pelanggan ? item.pelanggan.atma_wallet : null,
    namaBank: item.pelanggan ? item.pelanggan.bank : null,
    nomorRekening: item.pelanggan ? item.pelanggan.nomor_rekening : null,
  }));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pelangganTableData
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(pelangganTableData.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Pelanggan
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
                  "Image",
                  "Username",
                  "Nama Pelanggan",
                  "Email",
                  "Jenis Kelamin",
                  "Tanggal Lahir",
                  "Nomor Telepon",
                  "Poin",
                  "Atma Wallet",
                  "Nama Bank",
                  "Nomor Rekening",
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
                      img,
                      username,
                      nama,
                      email,
                      jenisKelamin,
                      tanggalLahir,
                      nomorTelepon,
                      poin,
                      atmaWallet,
                      namaBank,
                      nomorRekening,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === currentItems.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={username}>
                        <td className={className}>
                          <Avatar
                            src={img}
                            alt={username}
                            className="w-14 h-14 object-cover rounded-md"
                          />
                        </td>
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
                            {nomorTelepon}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {poin}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {atmaWallet}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {namaBank}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {nomorRekening}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Link to="/admin/pelanggan/profile">
                            <FontAwesomeIcon
                              icon={faEllipsisV}
                              className="mr-2"
                            />
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )
              )}
              {/* {renderTableData()} */}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
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
                onClick={() => handlePageChange(currentPage + 1)}
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

export default ReadPelanggan;
