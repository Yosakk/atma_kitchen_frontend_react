import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Chip,
  CardBody,
  CardFooter,
  Button,
  Tabs,
  TabsHeader,
  Tab,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useParams, Link } from "react-router-dom";
import { showAllTransaksiHistoryCustomer, statusPesananTelat } from "../../../api/customer/TransaksiApi"; // Updated import
import { getImage } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  {
    label: "Belum Bayar",
    value: "Belum Bayar",
  },
  {
    label: "Sudah Dibayar",
    value: "Sudah Dibayar",
  },
  {
    label: "Telat Bayar",
    value: "Telat Bayar",
  },
];

const ReadKonfirmasiPembayaran = () => {
  let { id } = useParams();
  console.log("masuk history", id);
  const [selectedTab, setSelectedTab] = useState("Sudah Dibayar");
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      console.log("masuk fetch", id);
      const response = await showAllTransaksiHistoryCustomer();
      const filteredData = response.data.filter(
        (item) =>
          item.transaksi && item.transaksi.status_transaksi === selectedTab
      );
      const mappedData = filteredData.map((item) => ({
        id: item.transaksi.id_transaksi,
        tanggal: item.transaksi.tanggal_transaksi,
        tanggalAmbil: item.transaksi.tanggal_pengambilan,
        status: item.transaksi.status_transaksi,
        produk: {
          nama:
            (item.id_produk ? item.produk.nama_produk : null) ||
            (item.id_produk_hampers
              ? item.produk_hampers.nama_produk_hampers
              : "Produk Tidak Ditemukan"),
          jumlahProduk: item.jumlah_produk || item.jumlah_produk_hampers,
          deskripsi:
            (item.produk ? item.produk.deskripsi_produk : null) ||
            (item.produk_hampers
              ? item.produk_hampers.deskripsi_produk_hampers
              : null),
          kategori:
            (item.produk ? item.produk.kategori_produk : null) || "Hampers",
          gambar:
            (item.produk ? item.produk.gambar_produk : null) ||
            (item.produk_hampers
              ? item.produk_hampers.gambar_produk_hampers
              : null),
          harga:
            (item.produk ? item.produk.harga_produk : null) ||
            (item.produk_hampers
              ? item.produk_hampers.harga_produk_hampers
              : null),
          jenisProduk: item.jenis_produk,
        },
        ongkir: item.transaksi.biaya_pengiriman,
        total: item.transaksi.total_pembayaran,
        nomorNota: item.transaksi.nomor_nota,
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
  }, [selectedTab]);

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleConfirmTelatBayar = async () => {
    console.log("Transaction marked as Telat Bayar:", currentTransactionId);
    setAcceptModalOpen(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const filteredData = historyData.filter((item) =>
    item.produk.nama.toLowerCase().includes(searchValue.toLowerCase())
  );

  const groupedData = groupBy(filteredData, "id");
  const totalPages = Math.ceil(Object.keys(groupedData).length / itemsPerPage);

  const updateStatus = async (transactionId, status) => {
    try {
      await statusPesananTelat({ status_transaksi: status }, transactionId);
      fetchData(); // Refresh data
      toast.success("Status transaksi berhasil diubah");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Status transaksi gagal diubah");
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Konfirmasi Pembayaran Pesanan
            </Typography>
          </div>
        </div>
        <div className="mb-8 flex items-center justify-between gap-8">
          <Tabs value={selectedTab} className="w-full overflow-x-auto">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  active={selectedTab === value}
                  onClick={() => setSelectedTab(value)}
                >
                  &nbsp;&nbsp;&nbsp;{label}&nbsp;&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
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
              <TransactionCard
                key={index}
                groupKey={groupKey}
                items={groupedData[groupKey]}
                setCurrentTransactionId={setCurrentTransactionId}
                setAcceptModalOpen={setAcceptModalOpen}
                updateStatus={updateStatus} // Pass updateStatus function as prop
              />
            ))}
        </CardBody>
      )}
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={handleClickPrevious}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={handleClickNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </CardFooter>

      {/* Modal for confirming "Telat Bayar" */}
      <Dialog open={acceptModalOpen} handler={setAcceptModalOpen}>
        <DialogHeader>Konfirmasi Telat Bayar</DialogHeader>
        <DialogBody>
          Apakah anda yakin menyatakan pesanan ini Telat Dibayar?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setAcceptModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirmTelatBayar}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </Card>
  );
};

const TransactionCard = ({
  groupKey,
  items,
  setCurrentTransactionId,
  setAcceptModalOpen,
  updateStatus // Accept updateStatus function as prop
}) => {
  const [expanded, setExpanded] = useState(false);
  const firstItem = items[0];

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
            color={firstItem.status === "Sudah Dibayar" ? "green" : "red"}
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
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2 mr-2"
              >
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
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="mb-2 flex items-center"
            >
              Rp {(item.produk.harga || 0) * (item.produk.jumlahProduk || 0)}
            </Typography>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="outlined"
            size="sm"
            color="blue"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
          </Button>
        </div>
        <div className="mt-4">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="mb-2 ml-auto"
          >
            Ongkos Kirim: Rp {firstItem.ongkir}
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 ml-auto">
            Total Belanja: Rp {firstItem.total + firstItem.ongkir}
          </Typography>
        </div>
      </div>
      <div className="flex justify-end items-center">
        {firstItem.status === "Sudah Dibayar" && (
          <div className="flex justify-end items-center mt-4 gap-4">
            <Link to={`/admin/konfirmasi/add/${groupKey}`}>
              <Button variant="filled" size="sm" color="blue">
                Konfirmasi
              </Button>
            </Link>
          </div>
        )}
        {firstItem.status === "Belum Bayar" && (
          <div className="flex justify-end items-center mt-4">
            <Button
              variant="filled"
              color="blue"
              onClick={() => updateStatus(firstItem.id, "Telat Bayar")} // Use updateStatus function
            >
              Telat Bayar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadKonfirmasiPembayaran;

function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}
