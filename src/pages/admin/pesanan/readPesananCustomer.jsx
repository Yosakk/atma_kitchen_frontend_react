import React, { useState, useEffect, useReducer } from "react";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Chip,
  CardBody,
  CardFooter,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { showAllTransaksiHistoryCustomer, editStatusTransaksiDiantar } from "../../../api/customer/TransaksiApi";
import { getImage } from "../../../api";
import useRefresh from "../../../services/useRefresh";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

const ReadPesananCustomer = () => {
  let { id } = useParams();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [currentTransactionId, setCurrentTransactionId] = useState(null); // New state to hold current transaction ID
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false); // State for the accept modal
  const itemsPerPage = 5;
  const refresh = useRefresh(historyData);

  const fetchData = async () => {
    try {
      const response = await showAllTransaksiHistoryCustomer();
      const filteredData = response.data.filter(
        (item) =>
          item.transaksi &&
          item.transaksi.status_transaksi === "-" &&
          item.transaksi.jenis_pengiriman === "Diantar"
      );
      const mappedData = filteredData.map((item) => ({
        id: item.transaksi.id_transaksi,
        tanggal: item.transaksi.tanggal_transaksi,
        tanggalAmbil: item.transaksi.tanggal_pengambilan,
        status: item.transaksi.status_transaksi === "-" ? "Belum Bayar" : item.transaksi.status_transaksi,
        produk: {
          nama: (item.id_produk ? item.produk.nama_produk : null) || (item.id_produk_hampers ? item.produk_hampers.nama_produk_hampers : "Produk Tidak Ditemukan"),
          jumlahProduk: (item.jumlah_produk) || (item.jumlah_produk_hampers),
          deskripsi: (item.produk ? item.produk.deskripsi_produk : null) || (item.produk_hampers ? item.produk_hampers.deskripsi_produk_hampers : null),
          kategori: (item.produk ? item.produk.kategori_produk : null) || ("Hampers"),
          gambar: (item.produk ? item.produk.gambar_produk : null) || (item.produk_hampers ? item.produk_hampers.gambar_produk_hampers : null),
          harga: (item.produk ? item.produk.harga_produk : null) || (item.produk_hampers ? item.produk_hampers.harga_produk_hampers : null),
          jenisProduk: item.jenis_produk,
        },
        ongkir: item.transaksi.biaya_pengiriman,
        total: item.transaksi.total_pembayaran,
        nomorNota: item.transaksi.nomor_nota
      }));

      setHistoryData(mappedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const filteredData = historyData.filter((item) =>
    item.produk.nama.toLowerCase().includes(searchValue.toLowerCase())
  );

  const groupedData = groupBy(filteredData, "id");
  const totalPages = Math.ceil(Object.keys(groupedData).length / itemsPerPage);

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Pesanan Yang Perlu Di Input Jarak
            </Typography>
          </div>
        </div>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </CardHeader>

      {!isLoading && (
        <CardBody className="px-4">
          {Object.keys(groupedData)
            .slice(startIndex, endIndex)
            .map((groupKey, index) => (
              <TransactionCard key={index} groupKey={groupKey} items={groupedData[groupKey]} setCurrentTransactionId={setCurrentTransactionId} setIsAcceptModalOpen={setIsAcceptModalOpen} />
            ))}
        </CardBody>
      )}
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={handleClickPrevious} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button variant="outlined" size="sm" onClick={handleClickNext} disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      </CardFooter>

      {/* Accept Modal */}
      <Dialog open={isAcceptModalOpen} handler={() => setIsAcceptModalOpen(!isAcceptModalOpen)}>
        <DialogHeader>Konfirmasi Telat Bayar</DialogHeader>
        <DialogBody divider>
          Apakah Anda yakin ingin menandai transaksi ini sebagai telat bayar?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setIsAcceptModalOpen(!isAcceptModalOpen)} className="mr-1">
            Batalkan
          </Button>
          <Button variant="filled" color="green" onClick={() => {
            // You can handle the action here
            console.log("Transaksi Telat Bayar:", currentTransactionId);
            setIsAcceptModalOpen(!isAcceptModalOpen);
          }}>
            Ya
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </Card>
  );
};

const TransactionCard = ({ groupKey, items, setCurrentTransactionId, setIsAcceptModalOpen }) => {
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {});
  const firstItem = items[0];


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = async () => {
    try {
      await editStatusTransaksiDiantar(firstItem.id, formData);
      console.log("Saved:", formData);
      toast.success("Status transaksi berhasil diubah");
      toggleModal();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Gagal mengubah status transaksi");
      
    }
  };
  return (
    <div className="border p-3 rounded-lg mb-4">
      <div className="flex justify-between">
        <Typography variant="h6" color="black" className="mb-4">
          ID Transaksi: {groupKey}
        </Typography>
        <Typography variant="h6" color="black" className="mb-4">
          Nomor Nota: {firstItem.nomorNota}
        </Typography>
      </div>
      <div className="flex justify-between mb-3">
        <Typography variant="small" color="black">
          Tanggal Transaksi : {firstItem.tanggal}
        </Typography>
        <Typography variant="small" color="black">
          Tanggal Pengambilan : {firstItem.tanggalAmbil}
        </Typography>
      </div>
      <div className="flex pb-3">
        <Typography variant="h6" color="black" className="ml-auto">
          <Chip
            size="sm"
            variant="ghost"
            value={firstItem.status}
            color={
              firstItem.status === "Selesai"
                ? "green"
                : firstItem.status === "Dikirim"
                  ? "amber"
                  : firstItem.status === "Diproses"
                    ? "blue"
                    : firstItem.status === "-"
                      ? "purple"
                      : firstItem.status === "Sudah Dibayar"
                        ? "lightBlue"
                        : "red"
            }
          />
        </Typography>
      </div>
      {items.slice(0, expanded ? items.length : 1).map((item, idx) => (
        <div key={idx} className="grid grid-cols-6 border-b border-t pt-4 pb-4">
          <div className="mx-auto col-span-3 md:col-span-1 flex justify-center items-center">
            <img
              src={getImage(item.produk.gambar)}
              alt={item.produk.nama}
              className="inline-block h-[120px] w-[120px] md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] object-cover object-center"
            />
          </div>
          <div className="col-span-3">
            <div className="flex items-center">
              <Typography variant="h5" color="blue-gray" className="mb-2 mr-3">
                {item.produk.nama}
              </Typography>
              <Typography variant="paragraph" color="blue-gray" className="mb-2 mr-2">
                x {item.produk.jumlahProduk}
              </Typography>
              <Typography variant="paragraph" color="gray" className="mb-2">
                ({item.produk.jenisProduk})
              </Typography>
            </div>
            <Typography>{item.produk.deskripsi}</Typography>
            <div className="w-max mt-2">
              <Chip
                size="sm"
                variant="ghost"
                value={item.produk.kategori}
                color={
                  item.produk.kategori === "Cake"
                    ? "green"
                    : item.produk.kategori === "Roti"
                      ? "amber"
                      : item.produk.kategori === "Minuman"
                        ? "blue"
                        : item.produk.kategori === "Titipan"
                          ? "purple"
                          : "red"
                }
              />
            </div>
          </div>
          <div className="flex justify-end col-span-6 md:col-span-2">
            <Typography variant="paragraph" color="blue-gray" className="mb-2 flex items-center">
              Rp {(item.produk.harga || 0) * (item.produk.jumlahProduk || 0)}
            </Typography>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="outlined" size="sm" color="blue" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
          </Button>
        </div>
        <div className="mt-4">
          <Typography variant="paragraph" color="blue-gray" className="mb-2 ml-auto">
            Ongkos Kirim: Rp {firstItem.ongkir}
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 ml-auto">
            Total Belanja: Rp {firstItem.total + firstItem.ongkir}
          </Typography>
        </div>
      </div>
      <div className="flex justify-end items-center mt-4 gap-4 ">
        <Button variant="filled" size="sm" color="blue" onClick={toggleModal}>
          Input Jarak
        </Button>
      </div>

      <Dialog open={isModalOpen} handler={toggleModal}>
        <DialogHeader>Input Jarak dan Nama Pengirim</DialogHeader>
        <DialogBody divider>
          <div className="mb-4">
            <Input
              type="number"
              label="Jarak"
              name="jarak_pengiriman"
              onChange={setFormData}
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Nama Pengirim"
              name="nama_pengirim"
              onChange={setFormData}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={toggleModal} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ReadPesananCustomer;

function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
}
