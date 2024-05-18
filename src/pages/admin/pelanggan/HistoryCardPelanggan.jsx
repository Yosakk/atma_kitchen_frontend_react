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
  Tab,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { showTransaksiHistory, showTransaksiHistoryCustomer } from "../../../api/customer/TransaksiApi";
import { getImage } from "../../../api";

const TABS = [
  {
    label: "Semua",
    value: "Semua",
  },
  {
    label: "Belum Bayar",
    value: "-",
  },
  {
    label: "Menunggu",
    value: "Menunggu",
  },
  {
    label: "Terbayar",
    value: "Sudah Dibayar",
  },
  {
    label: "Diproses",
    value: "Diproses",
  },
  {
    label: "Dikirim",
    value: "Dikirim",
  },
  {
    label: "Selesai",
    value: "Selesai",
  },
];

const HistoryCardPelanggan = () => {
  let { id } = useParams();
  console.log("masuk history", id);

  const [selectedTab, setSelectedTab] = useState("Semua");
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage = 5; // Ubah sesuai dengan jumlah item yang ingin ditampilkan per halaman

  useEffect(() => {
    fetchData();
  }, [selectedTab, searchValue]);

  const fetchData = async () => {
    try {
      const response = await showTransaksiHistoryCustomer(id);
      const mappedData = response.data.map((item) => ({
        id: item.id_transaksi,
        tanggal: item.tanggal_transaksi,
        status: item.status_transaksi,
        produk: {
          nama: item.nama_produk,
          deskripsi: item.deskripsi_produk,
          kategori: item.kategori_produk,
          gambar: item.gambar_produk,
          harga: item.total_harga_transaksi,
        },
        total: item.total_pembayaran,
      }));
      setHistoryData(mappedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
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
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
          <CustomTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
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
    </Card>
  );
};

const CustomTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <Tabs value={selectedTab} className="w-full md:w-max overflow-x-auto">
      {TABS.map(({ label, value }) => (
        <Tab
          key={value}
          value={value}
          active={selectedTab === value}
          onClick={() => setSelectedTab(value)}
        >
          &nbsp;&nbsp;{label}&nbsp;&nbsp;
        </Tab>
      ))}
    </Tabs>
  );
};

const TransactionCard = ({ groupKey, items }) => {
  const [expanded, setExpanded] = useState(false);
  const firstItem = items[0];

  return (
    <div className="border p-3 rounded-lg mb-4">
      <Typography variant="h6" color="black" className="mb-4">
        ID Transaksi: {groupKey}
      </Typography>
      <Typography variant="h6" color="black">
        Tanggal Transaksi : {firstItem.tanggal}
      </Typography>
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
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.produk.nama}
            </Typography>
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
              className="mb-2  flex items-center"
            >
              Rp {item.produk.harga}
            </Typography>
          </div>
        </div>
      ))}
      {firstItem.status === "-" && (
        <div className="flex justify-end">
          <Button variant="filled" color="lightBlue">
            Bayar
          </Button>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button
            variant="text"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
          </Button>
        </div>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="mb-2 ml-auto"
        >
          Total : {firstItem.total}
        </Typography>
      </div>
    </div>
  );
};

export default HistoryCardPelanggan;

// Fungsi untuk mengelompokkan data berdasarkan kunci tertentu
function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}
