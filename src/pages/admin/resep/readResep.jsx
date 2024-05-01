import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { resepTableData } from "../../../data/resepTableData";

const AddButton = () => {
  return (
    <Link to="/admin/resep/add">
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Tambah
      </button>
    </Link>
  );
};

const ReadResep = () => {
  const [searchValue, setSearchValue] = useState("");
  // Mengelompokkan data berdasarkan nama produk
  const groupedData = resepTableData.reduce((acc, curr) => {
    const existing = acc.find((item) => item.namaProduk === curr.namaProduk);
    if (existing) {
      existing.bahanBaku.push({ nama: curr.namaBahanBaku, jumlah: curr.jumlahBahan });
    } else {
      acc.push({
        namaProduk: curr.namaProduk,
        bahanBaku: [{ nama: curr.namaBahanBaku, jumlah: curr.jumlahBahan }],
      });
    }
    return acc;
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResep, setSelectedResep] = useState("");

  const openModal = (resep) => {
    setSelectedResep(resep);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedResep(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log("Delete", selectedResep);
    closeModal();
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6 flex justify-between items-center">
          <Typography variant="h6" color="white">
            Resep
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
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Nama Produk
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Nama Bahan Baku
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Jumlah Bahan
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
  {groupedData.filter(({ namaProduk, bahanBaku }) => {
    const bahanMatch = bahanBaku.some(({ nama }) =>
      nama.toLowerCase().includes(searchValue.toLowerCase())
    );
    const jumlahMatch = bahanBaku.some(({ jumlah }) =>
      jumlah.toString().toLowerCase().includes(searchValue.toLowerCase())
    );
    return namaProduk.toLowerCase().includes(searchValue.toLowerCase()) || bahanMatch || jumlahMatch;
  }).map(({ namaProduk, bahanBaku }) => (
    <tr key={namaProduk}>
      <td className="py-3 px-5 border-b border-blue-gray-50 text-[11px] font-semibold">{namaProduk}</td>
      <td className="py-3 px-5 border-b border-blue-gray-50 text-[11px] font-semibold">
        {bahanBaku.map(({ nama }, index) => (
          <div key={index}>{nama}</div>
        ))}
      </td>
      <td className="py-3 px-5 border-b border-blue-gray-50 text-[11px] font-semibold">
        {bahanBaku.map(({ jumlah }, index) => (
          <div key={index}>{jumlah}</div>
        ))}
      </td>
      <td className="py-3 px-5 border-b border-blue-gray-50 text-[11px] font-semibold">
        <div className="btn-group text-center">
          <Link to="/admin/resep/edit">
            <Button className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2">
              <FontAwesomeIcon icon={faEdit} className="mr-2" />Ubah
            </Button>
          </Link>
          <Button to="" className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => openModal({ namaProduk, bahanBaku })}>
            <FontAwesomeIcon icon={faTrash} className="mr-2" />Hapus
          </Button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </CardBody>
      </Card>
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative w-96 bg-white rounded-lg p-4">
            <Typography variant="h6" className="mb-4">Hapus Resep</Typography>
            <Typography className="text-gray-600 mb-4">Apakah anda yakin ingin Menghapus Resep Dari {selectedResep?.namaProduk}?</Typography>
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

export default ReadResep;
