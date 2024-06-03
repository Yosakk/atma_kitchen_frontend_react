import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Chip,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useParams, Link } from "react-router-dom";
import { showTransaksiHistoryCustomer } from "../api/customer/TransaksiApi";
import { getImage } from "../api";
import { pesananCustomer } from "../api/customer/TransaksiApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  { label: "Semua", value: "Semua" },
  { label: "Menunggu", value: "-" },
  { label: "Bayar", value: "Belum Dibayar" },
  { label: "Terbayar", value: "Sudah Dibayar" },
  { label: "Valid", value: "Pembayaran Valid" },
  { label: "Diterima", value: "Diterima" },
  { label: "Ditolak", value: "Ditolak" },
  { label: "Diproses", value: "Diproses" },
  { label: "Dikirim", value: "Dikirim" }, // Custom filter
  { label: "Dipickup", value: "Sudah di-pickup" },
  { label: "Selesai", value: "Selesai" },
  { label: "Dibatalkan", value: "Telat Bayar" },
];

const TransaksiHistory = () => {
  let { id } = useParams();
  console.log("masuk history", id);
  const [selectedTab, setSelectedTab] = useState("Semua");
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, [selectedTab, searchValue]);

  const fetchData = async () => {
    try {
      const response = await showTransaksiHistoryCustomer();
      const mappedData = response.data.map((item) => ({
        id: item.transaksi.id_transaksi,
        nomorNota: item.transaksi.nomor_nota,
        tanggal: item.transaksi.tanggal_transaksi,
        tanggalAmbil: item.transaksi.tanggal_pengambilan,
        status: item.transaksi.status_transaksi,
        jenisPengiriman: item.transaksi.jenis_pengiriman,
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
        total: item.transaksi.total_pembayaran,
        ongkir: item.transaksi.biaya_pengiriman,
      }));
      setHistoryData(mappedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    console.log("ini idnya", id);
    try {
      await pesananCustomer({ status_transaksi: newStatus }, id);
      fetchData();
      toast.success("Status transaksi berhasil diubah");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Status transaksi gagal diubah");
    }
  };

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const filteredData =
    selectedTab === "Semua"
      ? historyData.filter((item) =>
        item.produk.nama.toLowerCase().includes(searchValue.toLowerCase())
      )
      : selectedTab === "Dikirim"
        ? historyData.filter(
          (item) =>
            (item.status === "Sedang dikirim kurir" || item.status === "Siap di-pickup") &&
            item.produk.nama.toLowerCase().includes(searchValue.toLowerCase())
        )
        : historyData.filter(
          (item) =>
            item.status === selectedTab &&
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
              Riwayat Pemesanan
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Lihat semua pemesanan Anda
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-4 md:flex-row">
          <Tabs value={selectedTab} className="w-full overflow-x-auto mb-10 md:flex-col">
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

        <div className="w-full md:w-72 flex justify-end">
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
                updateStatus={updateStatus}
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
      <ToastContainer />
    </Card>
  );
};

const TransactionCard = ({ groupKey, items, updateStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const firstItem = items[0];

  return (
    <div className="border p-3 rounded-lg mb-4">
      {/* <Typography variant="h6" color="black" className="mb-4">
        ID Transaksi: {groupKey}
      </Typography> */}
      <div className="flex justify-between">
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
            value={firstItem.status === "Dikirim" ?
              (firstItem.jenisPengiriman === "Pickup" ? "Pickup" : "Diantar")
              : firstItem.status
            }
            color={
              firstItem.status === "Selesai" ? "green" :
                firstItem.status === "Sudah di-pickup" ? "amber" :
                  firstItem.status === "Diterima" ? "blue" :
                    firstItem.status === "-" ? "purple" :
                      firstItem.status === "Belum Dibayar" ? "purple" :
                        firstItem.status === "Sudah Dibayar" ? "lightBlue" :
                          firstItem.status === "Sedang dikirim kurir" ? "indigo" :
                            firstItem.status === "Siap di-pickup" ? "teal" :
                              "red"
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
      {firstItem.status === "Belum Dibayar" && (
        <div className="flex justify-end items-center mt-4">
          <Link to={`/pembayaran/${groupKey}`}>
            <Button variant="filled" color="lightBlue">
              Bayar
            </Button>
          </Link>
        </div>
      )}
      <div className="flex justify-end gap-2">
        {firstItem.status !== "Belum Dibayar" &&
          firstItem.status !== "Ditolak" &&
          firstItem.status !== "Telat Bayar" &&
          firstItem.status !== "-" && (
            <div className="flex justify-end items-center mt-4">
              <Link to={`/nota/${groupKey}`}>
                <Button variant="filled" color="lightBlue">
                  Cetak Nota
                </Button>
              </Link>
            </div>
          )}
        {firstItem.status === "Sedang dikirim kurir" && (
          <div className="flex justify-end items-center mt-4">
            <Button variant="filled" color="blue" onClick={() => updateStatus(firstItem.id, "Sudah dipickup")}>
              Sudah Dipickup
            </Button>
          </div>
        )}
        {firstItem.status === "Sudah di-pickup" && (
          <div className="flex justify-end items-center mt-4">
            <Button variant="filled" color="blue" onClick={() => updateStatus(firstItem.id, "Selesai")}>
              Selesai
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransaksiHistory;

// Fungsi untuk mengelompokkan data berdasarkan kunci tertentu
function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}
