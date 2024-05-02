import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { pelangganTableData } from "../../../data/pelangganTableData";

const ReadPelanggan = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPage = Math.ceil(pelangganTableData.length / itemsPerPage);

  const renderTableData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = pelangganTableData.slice(startIndex, endIndex);

    return currentData.map(({ img, username, nama, email, jenisKelamin, tanggalLahir, nomorTelepon, poin, atmaWallet, namaBank, nomorRekening }, key) => {
      const className = `py-3 px-5 ${
        key === currentData.length - 1
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
              <FontAwesomeIcon icon={faEllipsisV} className="mr-2" />
            </Link>
          </td>
        </tr>
      );
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Pelanggan
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Image", "Username", "Nama Pelanggan", "Email", "Jenis Kelamin", "Tanggal Lahir", "Nomor Telepon", "Poin", "Atma Wallet", "Nama Bank", "Nomor Rekening", ""].map((el) => (
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
              {renderTableData()}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <nav className="relative z-0 inline-flex">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              {[...Array(totalPage)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
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
                disabled={currentPage === totalPage}
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
