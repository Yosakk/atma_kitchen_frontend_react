import React, { useState } from "react";
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

import { productTableData } from "../../../data/productTableData";
import { hampersTableData } from "../../../data/hampersTableData";

const ReadProduct = () => {
  const [contentType, setContentType] = useState("product");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete", selectedProduct);
    closeModal();
  };

  const handleProductClick = () => {
    setContentType("product");
  };

  const handleHampersClick = () => {
    setContentType("hampers");
  };

  const contentData = contentType === "product" ? productTableData : hampersTableData;
  const contentTypeLabel = contentType === "product" ? "Product" : "Hampers";

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
    
    <div className="w-full md:w-96 overflow-x-auto">
      <Tabs value={contentType} indicatorColor="primary">
        <TabsHeader>
          <Tab value="product" onClick={handleProductClick}>
            <CakeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
            Product
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
        <button
          className="py-2 px-4 rounded-md bg-orange-600 text-white"
          // onClick={handleAddClick}
        >
          Tambah
        </button>
      </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nama Produk", "Gambar Produk", "Deskripsi Produk", "Harga Produk", "Kategori Produk", "Status Produk", "Kuantitas", ""].map((el) => (
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
              {contentData.map(({
                namaProduk,
                gambarProduk,
                deskripsiProduk,
                hargaProduk,
                kategoriProduk,
                statusProduk,
                kuantitas
              }, key) => {
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
                      {deskripsiProduk}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {hargaProduk}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {kategoriProduk}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Chip
                      variant="gradient"
                      color={statusProduk === "Ready Stock" ? "green" : "blue-gray"}
                      value={statusProduk}
                      className="py-0.5 px-2 text-[11px] font-medium w-fit"
                    />
                  </td>
                  <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                      {kuantitas}
                    </Typography>
                  </td>
                  <td className={className}>
                    <div className="btn-group text-center">
                        <Button to="edit" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
                            <FontAwesomeIcon icon={faEdit} className="mr-2" />Edit
                        </Button>
                        <Button to="" className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => openModal({
                        namaProduk,
                        gambarProduk,
                        deskripsiProduk,
                        hargaProduk,
                        kategoriProduk,
                        statusProduk,
                        kuantitas
                      })}>
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />Delete
                        </Button>
                    </div>
                    {/* <Typography
                      as="a"
                      href="#"
                      className="text-xs font-semibold text-blue-gray-600"
                    >
                      Edit
                    </Typography>
                    <Typography
                      as="a"
                      href="#"
                      className="text-xs font-semibold text-blue-gray-600"
                      onClick={() => openModal({
                        namaProduk,
                        gambarProduk,
                        deskripsiProduk,
                        hargaProduk,
                        kategoriProduk,
                        statusProduk,
                        kuantitas
                      })}
                    >
                      Delete
                    </Typography> */}
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
          <Typography variant="h6" className="mb-4">Delete {contentType === "product" ? "Product" : "Hampers"}</Typography>
            <Typography className="text-gray-600 mb-4">Are you sure you want to delete {selectedProduct?.namaProduk}?</Typography>
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

export default ReadProduct;
