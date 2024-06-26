import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Grid,
  Button,
  Input,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  ShoppingBagIcon,
  CakeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import { produkTableData } from "../../../data/produkTableData";
import { hampersTableData } from "../../../data/hampersTableData";

const AddProdukButton = ({ contentType }) => {
  const addButtonLink = contentType === "produk" ? "/admin/produk/add" : "/admin/hampers/add";

  return (
    <Link to={addButtonLink}>
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tambah
      </button>
    </Link>
  );
};
const EditProdukButton = ({ contentType }) => {
  const editButtonLink = contentType === "produk" ? "/admin/produk/edit" : "/admin/hampers/edit";

  return (
    <Link to={editButtonLink}>
      <Button className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
        <FontAwesomeIcon icon={faEdit} className="mr-2" />Ubah
      </Button>
    </Link>
    
      
  );
};
const ReadProduk = () => {
  const [contentType, setContentType] = useState("produk");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState(null);
  const [searchValue, setSearchValue] = useState("");


  const openModal = (produk) => {
    setSelectedProduk(produk);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduk(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete", selectedProduk);
    closeModal();
  };

  const handleProdukClick = () => {
    setContentType("produk");
  };

  const handleHampersClick = () => {
    setContentType("hampers");
  };

  const contentData = contentType === "produk" ? produkTableData : hampersTableData;
  const contentTypeLabel = contentType === "produk" ? "Produk" : "Hampers";

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
    
    <div className="w-full md:w-96 overflow-x-auto">
      <Tabs value={contentType} indicatorColor="primary">
        <TabsHeader>
          <Tab value="produk" onClick={handleProdukClick}>
            <CakeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
            Produk
          </Tab>
          <Tab value="hampers" onClick={handleHampersClick}>
            <ShoppingBagIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
            Hampers
          </Tab>
        </TabsHeader>
      </Tabs>
      
    </div>
      <Card>
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
        <Typography variant="h6" color="white">
          {contentTypeLabel}
        </Typography>
        
        <AddProdukButton contentType={contentType} />
      </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 ">
        <div className="ml-auto mt-1 mb-4 mr-4 w-56 flex justify-end items-center">
          <Input
            label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
          <table className="w-full min-w-[1250px] table-auto">
            <thead>
            {/* <div className="mr-auto mt-2 mb-2 md:mr-4 md:w-56 flex justify-end items-center">
              <Input label="Search" />
            </div> */}
            
              <tr>
                {["Nama Produk", "Gambar Produk", "Deskripsi Produk", "Harga Produk", contentType === "produk" && "Kategori Produk", contentType === "produk" && "Status Produk", contentType === "produk" && "Kuantitas", contentType === "produk" && "Nama Penitip", " "].map((el) => (
                  el && (
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
                ))}
              </tr>
            </thead>
            <tbody>
            {contentData
            .filter((item) =>
              Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            .map(({ namaProduk, gambarProduk, deskripsiProduk, hargaProduk, kategoriProduk, statusProduk, kuantitas, namaPenitip }, key) => {
              const className = `py-3 px-5 ${
                key === contentData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
              }`;
              return(
                <tr key={namaProduk}>
                  <td className={className}>
                    <Typography
                      variant="small"
                      className="text-[11px] font-semibold text-blue-gray-600"
                    >
                      {namaProduk}
                    </Typography>
                  </td>
                  <td className={className}>
                    <img
                      src={gambarProduk}
                      alt={namaProduk}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {deskripsiProduk || "-"}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {hargaProduk || "-"}
                    </Typography>
                  </td>
                  {contentType === "produk" && (
                    <>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {kategoriProduk || "-"}
                        </Typography>
                      </td>
                      <td className={className}>
                        {statusProduk ? (
                          <Chip
                            variant="gradient"
                            color={statusProduk === "Ready Stock" ? "green" : "blue-gray"}
                            value={statusProduk}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {kuantitas || "-"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {namaPenitip || "-"}
                        </Typography>
                      </td>
                    </>
                  )}
                  <td className={className}>
                    <div className="btn-group text-center">
                      
                      <EditProdukButton contentType={contentType} />
                      <Button to="" className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => openModal({
                        namaProduk,
                        gambarProduk,
                        deskripsiProduk,
                        hargaProduk,
                        kategoriProduk,
                        statusProduk,
                        kuantitas,
                        namaPenitip
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
        </CardBody>
      </Card>
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative w-96 bg-white rounded-lg p-4">
          <Typography variant="h6" className="mb-4">Hapus {contentType === "produk" ? "Produk" : "Hampers"}</Typography>
            <Typography className="text-gray-600 mb-4">Apakah Anda Yakin ingin Menghapus {contentTypeLabel} {selectedProduk?.namaProduk}?</Typography>
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

export default ReadProduk;

