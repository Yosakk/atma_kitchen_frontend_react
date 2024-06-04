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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  Tab,
  TabsHeader,
  Checkbox,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import {
  showAllTransaksiHistoryCustomer,
  editStatusTransaksiMO,
  pesananDiproses
} from "../../../api/customer/TransaksiApi";
import { getImage } from "../../../api";
import AlertAnimation from "../../../assets/images/AlertAnimation.json";
import Proses from "../../../assets/images/Proses.json";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABS = [
  {
    label: "Valid",
    value: "Pembayaran Valid",
  },
  {
    label: "Diterima",
    value: "Diterima",
  },
];

const ReadKonfirmasiPesanan = () => {
  let { id } = useParams();
  console.log("masuk history", id);
  const [selectedTab, setSelectedTab] = useState("Pembayaran Valid");
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [acceptError, setAcceptError] = useState("");
  const [prosesError, setProsesError] = useState("");
  const [successProcess, setSuccessProcess] = useState("");
  const [prosesModalOpen, setProsesModalOpen] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState([]);

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
        nomorNota: item.transaksi.nomor_nota,
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  const filteredData = historyData.filter((item) =>
    item.produk.nama.toLowerCase().includes(searchValue.toLowerCase())
  );

  const groupedData = groupBy(filteredData, "id");
  const totalPages = Math.ceil(Object.keys(groupedData).length / itemsPerPage);

  const handleAccept = () => {
    editStatusTransaksiMO(currentTransactionId, {
      status_transaksi: "Diterima",
    })
      .then((res) => {
        console.log(res);
        setAcceptModalOpen(false);
        setAcceptError("");
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating transaction status:", error);
        const { message, bahan_baku_kurang } = error;
        if (Array.isArray(bahan_baku_kurang)) {
          setAcceptError(
            <>
              <Lottie
                animationData={AlertAnimation}
                style={{ width: 200, height: 200 }}
                className="mx-auto"
              />
              <Typography variant="h5">{`${message}:`}</Typography>
              <Typography variant="paragraph">
                {bahan_baku_kurang.map((bb, index) => (
                  <div key={index} className="ml-3">
                    {`${index + 1}. ${bb.nama_bahan} (Diminta: ${bb.jumlah_diminta
                      }, Stok: ${bb.stok_tercukupi})`}
                  </div>
                ))}
              </Typography>
            </>
          );
        } else {
          setAcceptError(message);
        }
      });
  };

  const handleReject = () => {
    editStatusTransaksiMO(currentTransactionId, { status_transaksi: "Ditolak" })
      .then((res) => {
        console.log(res);
        setRejectModalOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating transaction status:", error);
      });
  };

  const handleProses = () => {
    pesananDiproses({ id_transaksi: selectedTransactions, status_transaksi: "Diproses" })
      .then((res) => {
        console.log(res);
        const { message, bahan_baku_terpakai } = res;

        if (Array.isArray(bahan_baku_terpakai)) {
          console.log("cek", bahan_baku_terpakai);
          const successMessage = (
            <>
              <Lottie
                animationData={Proses}
                style={{ width: 200, height: 200 }}
                className="mx-auto"
              />
              <Typography variant="h5">{`${message}:`}</Typography>
              <Typography variant="paragraph">
                {bahan_baku_terpakai.map((bb, index) => (
                  <div key={index} className="ml-3">
                    {`${index + 1}. ${bb.nama_bahan} (Diminta: ${bb.jumlah_diminta}, Stok: ${bb.stok_tercukupi})`}
                  </div>
                ))}
              </Typography>
            </>
          );
          setSuccessProcess(successMessage);
        } else {
          setSuccessProcess(message);
        }
        setAcceptError("");
        fetchData();
        toast.success("Pesanan Berhasil Diproses");
      })
      .catch((error) => {
        console.error("Error updating transaction status:", error);
        const { message, data } = error;
        if (Array.isArray(data)) {
          setProsesError(
            <>
              <Lottie
                animationData={AlertAnimation}
                style={{ width: 200, height: 200 }}
                className="mx-auto"
              />
              <Typography variant="h5">{`${message}:`}</Typography>
              <Typography variant="paragraph">
                {data.map((bb, index) => (
                  <div key={index} className="ml-3">
                    {`${index + 1}. ${bb.nama_bahan} (Diminta: ${bb.jumlah_diminta
                      }, Stok: ${bb.stok_tercukupi})`}
                  </div>
                ))}
              </Typography>
            </>
          );
        } else {
          setProsesError(message);
        }
        setSuccessProcess("");
        toast.error("Pesanan Gagal Diproses");
      })
  };

  const handleCheckboxChange = (e, transactionId) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedTransactions((prevSelected) => [
        ...prevSelected,
        transactionId,
      ]);
    } else {
      setSelectedTransactions((prevSelected) =>
        prevSelected.filter((id) => id !== transactionId)
      );
    }
  };
  const handleAcceptSelectedTransactions = () => {
    console.log("ID transaksi yang dipilih:", selectedTransactions);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Konfirmasi Pesanan
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

        <div className="mb-8 flex items-center gap-4">
          <div className="relative">
            <Input
              label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {selectedTab === "Diterima" && (
            <Button
              variant="filled"
              size="sm"
              color="blue"
              onClick={() => {
                // setCurrentTransactionId(groupKey); // Set the current transaction ID
                setProsesModalOpen(true);
                handleAcceptSelectedTransactions(); // Open the accept modal
              }}
              className="ml-auto"
            >
              Proses Transaksi
            </Button>
          )}
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
                setAcceptModalOpen={setAcceptModalOpen}
                setProsesModalOpen={setProsesModalOpen}
                setRejectModalOpen={setRejectModalOpen}
                setCurrentTransactionId={setCurrentTransactionId}
                selectedTransactions={selectedTransactions}
                handleCheckboxChange={handleCheckboxChange}
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

      {/* Modal untuk menerima pesanan */}
      <Dialog
        open={acceptModalOpen}
        onClose={() => setAcceptModalOpen(false)}
        className="w-[400px]"
      >
        <DialogHeader>Menerima Pesanan</DialogHeader>
        <DialogBody>
          {acceptError ? (
            <Typography color="red">{acceptError}</Typography>
          ) : (
            "Apakah Anda yakin ingin menerima pesanan ini?"
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            className="mr-2"
            onClick={() => setAcceptModalOpen(false)}
          >
            Batal
          </Button>
          <Button color="blue" onClick={handleAccept}>
            Terima
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Modal untuk menolak pesanan */}
      <Dialog
        open={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        className="w-[400px]"
      >
        <DialogHeader>Menolak Pesanan</DialogHeader>
        <DialogBody>Apakah Anda yakin ingin menolak pesanan ini?</DialogBody>
        <DialogFooter>
          <Button
            color="red"
            className="mr-2"
            onClick={() => setRejectModalOpen(false)}
          >
            Batal
          </Button>
          <Button color="blue" onClick={handleReject}>
            Tolak
          </Button>
        </DialogFooter>
      </Dialog>
      {/* Modal untuk memproses pesanan */}
      <Dialog
        open={prosesModalOpen}
        onClose={() => setProsesModalOpen(false)}
        className="w-[400px]"
      >
        <DialogHeader>Melakukan Proses Pesanan</DialogHeader>
        <DialogBody>
          {prosesError ? (
            <Typography color="red">{prosesError}</Typography>
          ) : successProcess ? (
            <Typography color="green">{successProcess}</Typography>
          ) : (
            "Apakah Anda yakin ingin Memproses pesanan ini?"
          )}
        </DialogBody>
        <DialogFooter>

          {successProcess ? (
            <Button color="blue" onClick={() => setProsesModalOpen(false)}>
              Close
            </Button>
          ) : (
            <>
              <Button
                color="red"
                className="mr-2"
                onClick={() => setProsesModalOpen(false)}
              >
                Batal
              </Button>
              <Button color="blue" onClick={handleProses}>
                Proses
              </Button>
            </>
          )}

        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </Card>
  );
};

const TransactionCard = ({
  groupKey,
  items,
  setAcceptModalOpen,
  setProsesModalOpen,
  setRejectModalOpen,
  setCurrentTransactionId,
  selectedTransactions,
  handleCheckboxChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const firstItem = items[0];

  const parseNumber = (value) => {
    return isNaN(value) ? 0 : Number(value);
  };

  return (
    <div className="border p-3 rounded-lg mb-4">
      {firstItem.status === "Diterima" && (
        <div className="flex justify-end items-center mt-4">
          <Checkbox
            checked={selectedTransactions.includes(groupKey)}
            onChange={(e) => handleCheckboxChange(e, groupKey)}
          />
        </div>
      )}
      <div className="flex justify-between">
        <Typography variant="h6" color="black" className="mb-4">
          ID Transaksi: {groupKey}
        </Typography>
        <Typography variant="h6" color="black" className="mb-4">
          Nomor Nota: {firstItem.nomorNota}
        </Typography>
      </div>
      <div className="flex justify-between mb-3">
        <Typography variant="h6" color="black">
          Tanggal Transaksi : {firstItem.tanggal}
        </Typography>
        <Typography variant="h6" color="black">
          Tanggal Pengambilan : {firstItem.tanggalAmbil}
        </Typography>
      </div>
      <div className="flex pb-3">
        <Typography variant="h6" color="black" className="ml-auto">
          <Chip
            size="sm"
            variant="ghost"
            value={firstItem.status}
            color={firstItem.status === "Pembayaran Valid" ? "teal" : "red"}
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
        <div>
          <div className="mt-4 flex justify-end">
            <div>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="mb-2"
              >
                Ongkos Kirim: Rp {firstItem.ongkir}
              </Typography>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <Typography variant="h6" color="black" className="mb-2">
              Total Belanja: Rp {firstItem.total}{" "}
              <span className="ml-3">||</span>
            </Typography>
            <Typography variant="h6" color="black" className="mb-2 justify-end">
              Total Pembayaran: Rp {firstItem.total + firstItem.ongkir}
            </Typography>
          </div>
        </div>
      </div>
      {firstItem.status === "Pembayaran Valid" && (
        <div className="flex justify-end items-center mt-4">
          <Button
            variant="filled"
            size="sm"
            color="red"
            className="mr-2"
            onClick={() => {
              setCurrentTransactionId(groupKey); // Set the current transaction ID
              setRejectModalOpen(true); // Open the reject modal
            }}
          >
            Tolak
          </Button>

          {/* Tombol "Terima" untuk membuka modal */}
          <Button
            variant="filled"
            size="sm"
            color="blue"
            onClick={() => {
              setCurrentTransactionId(groupKey); // Set the current transaction ID
              setAcceptModalOpen(true); // Open the accept modal
            }}
          >
            Terima
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReadKonfirmasiPesanan;

function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
}
