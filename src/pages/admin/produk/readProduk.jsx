import React, { useState, useEffect } from "react";
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
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  ShoppingBagIcon,
  CakeIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import { showDataProduk } from "../../../api/admin/ProdukApi";
import { showDataHampers, deleteProdukHampers } from "../../../api/admin/ProdukApi"; // Import deleteProdukHampers
import { hampersTableData } from "../../../data/hampersTableData";
import { deleteProduk } from "../../../api/admin/ProdukApi";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [produkData, setProdukData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hampersData, setHampersData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchHampersData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataProduk();
      setProdukData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const fetchHampersData = async () => {
    try {
      const response = await showDataHampers();
      setHampersData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching hampers data:", error);
      setIsLoading(false);
    }
  };

  const openModal = (produk) => {
    setSelectedProduk(produk);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduk(null);
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!selectedProduk) {
      console.error("No product selected");
      return;
    }

    console.log(selectedProduk.idProdukHampers);

    try {
      if (contentType === "produk") {
        await deleteProduk(selectedProduk.idProduk);
        fetchData();
      } else {
        await deleteProdukHampers(selectedProduk.idProdukHampers); // Panggil deleteProdukHampers
        fetchHampersData();
      }
      console.log("Delete", selectedProduk);
      closeModal();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleProdukClick = () => {
    setContentType("produk");
  };

  const handleHampersClick = () => {
    setContentType("hampers");
  };

  const produkTableData = produkData.map(item => ({
    idProduk: item.id_produk,
    namaProduk: item.nama_produk,
    gambarProduk: "/img/team-2.jpeg",
    deskripsiProduk: item.deskripsi_produk,
    hargaProduk: item.harga_produk,
    kategoriProduk: item.kategori_produk,
    statusProduk: item.status_produk,
    kuantitas: item.kuantitas,
    namaPenitip: item.nama_penitip
  }));

  const hampersTableData = hampersData.map(item => ({
    idProdukHampers: item.id_produk_hampers,
    namaProduk: item.nama_produk_hampers,
    gambarProduk: "/img/team-4.jpeg",
    deskripsiProduk: item.deskripsi_produk_hampers,
    hargaProduk: item.harga_produk_hampers,
  }));

  const contentData = contentType === "produk" ? produkTableData : hampersTableData;
  const contentTypeLabel = contentType === "produk" ? "Produk" : "Hampers";
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contentData
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    contentData.length / itemsPerPage
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              {currentItems.map(({ idProduk, idProdukHampers, namaProduk, gambarProduk, deskripsiProduk, hargaProduk, kategoriProduk, statusProduk, kuantitas, namaPenitip }, key) => {
                const className = `py-3 px-5 ${key === contentData.length - 1
                  ? ""
                  : "border-b border-blue-gray-50"
                  }`;
                return (
                  <tr key={idProduk || idProdukHampers}>
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
                        <Button to="" className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => openModal({ idProduk, idProdukHampers, namaProduk, gambarProduk, deskripsiProduk, hargaProduk, kategoriProduk, statusProduk, kuantitas, namaPenitip })}>
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
                  className={`${currentPage === index + 1
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
            <Typography variant="h6" className="mb-4">Hapus {contentType === "produk" ? "Produk" : "Hampers"}</Typography>
            <Typography className="text-gray-600 mb-4">Apakah Anda Yakin ingin Menghapus {contentTypeLabel} {selectedProduk?.namaProduk || selectedProduk?.namaProdukHampers}?</Typography>
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
