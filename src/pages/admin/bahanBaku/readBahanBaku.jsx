import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { bahanBakuTableData } from "../../../data/bahanBakuTableData";

const AddProductButton = () => {
  return (
    <Link to="/admin/bahanBaku/add">
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tambah
      </button>
    </Link>
  );
};

const ReadBahanBaku = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBahanBaku, setSelectedBahanBaku] = useState("");

  const openModal = (bahanBaku) => {
    setSelectedBahanBaku(bahanBaku);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBahanBaku(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete", selectedBahanBaku);
    closeModal();
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Bahan Baku
          </Typography>
          <AddProductButton/>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama Bahan Baku", "Stok", "Satuan", ""].map((el) => (
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
              {bahanBakuTableData.map(({ nama, stok, satuan }, key) => {
                const className = `py-3 px-5 ${
                  key === bahanBakuTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={nama}>
                    <td className={className}>
                      <Typography
                        variant="small"
                        className="font-semibold text-blue-gray-600"
                      >
                        {nama}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {stok}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {satuan}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="btn-group text-center">
                        <Link to={{
                          pathname: "/admin/bahanBaku/edit",
                        }}>
                          <Button className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />Edit
                          </Button>
                        </Link>
                        <Button to="" className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => openModal({ nama, stok, satuan })}>
                          <FontAwesomeIcon icon={faTrash} className="mr-2" />Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative w-96 bg-white rounded-lg p-4">
            <Typography variant="h6" className="mb-4">Delete Bahan Baku</Typography>
            <Typography className="text-gray-600 mb-4">Are you sure you want to delete {selectedBahanBaku?.nama}?</Typography>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2" onClick={closeModal}>Cancel</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadBahanBaku;
