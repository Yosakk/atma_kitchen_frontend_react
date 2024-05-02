import { Link } from "react-router-dom";
import React, { useState } from "react";
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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { pembelianBahanBakuTableData } from "../../../data/pembelianBahanBakuTableData";
const AddButton = () => {
  return (
    <Link to="/mo/pencatatanPembelianBahanBaku/add">
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tambah
      </button>
    </Link>
  );
};


const readPencatatanPembelianBahanBaku = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPembelianBahanBaku, setSelectedPembelianBahanBaku] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const openModal = (pembelianbahanbaku) => {
    setSelectedPembelianBahanBaku(pembelianbahanbaku);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPembelianBahanBaku(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete", selectedPembelianBahanBaku);
    closeModal();
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pembelianBahanBakuTableData
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    pembelianBahanBakuTableData.length / itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Pencatatan Pembelian Bahan Baku
          </Typography>
          <AddButton/>
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
                {["Nama Bahan Baku", "Jumlah Pembelian","Satuan", "Harga Beli", "Tanggal Pembelian",  ""].map((el) => (
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
              {currentItems.map(({ namaBahanBaku, jumlahPembelian, hargaBeli, tanggalBeli, satuan }, key) => {
                const className = `py-3 px-5 ${
                  key === pembelianBahanBakuTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={namaBahanBaku}>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {namaBahanBaku}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {jumlahPembelian}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {satuan}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {hargaBeli}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {tanggalBeli}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="btn-group text-center">
                          <Link to={{
                            pathname: "/mo/pencatatanPembelianBahanBaku/edit",
                          }}>
                            <Button to="edit" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                                <FontAwesomeIcon icon={faEdit} className="mr-2" />Ubah
                            </Button>
                          </Link>
                            
                            <Button to="" className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => openModal({
                              namaBahanBaku,
                              jumlahPembelian,
                              hargaBeli,
                              tanggalBeli,
                              satuan,
                            })}>
                                <FontAwesomeIcon icon={faTrash} className="mr-2" />Hapus
                            </Button>
                        </div>
                    </td>
                  </tr>
                );
              })}
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
            <Typography variant="h6" className="mb-4">Hapus Pembelian Bahan Baku</Typography>
            <Typography className="text-gray-600 mb-4">Apakah anda yakin ingin Menghapus Pencatatan Pembelian {selectedPembelianBahanBaku?.namaBahanBaku}?</Typography>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2" onClick={closeModal}>Batal</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleDelete}>Yakin</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default readPencatatanPembelianBahanBaku;

