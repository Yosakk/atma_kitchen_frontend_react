import React, { useState, useEffect } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { generateLaporanKomisiPenitip } from "../../api/admin/LaporanApi";
import CetakKomisiPenitip from "./cetakKomisiPenitip";

const ReadKomisiPenitip = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [komisiPenitipData, setKomisiPenitipData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [year, month]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await generateLaporanKomisiPenitip({
        tahun: year,
        bulan: month,
      });
      setKomisiPenitipData(response.data);
      setIsLoading(false);
    } catch (error) {
      setKomisiPenitipData([]);
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleViewPDF = () => {
    setShowPDFViewer(true);
  };

  const handleClosePDFViewer = () => {
    setShowPDFViewer(false);
  };

  const formatToRupiah = (amount) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(amount).replace(/\s/g, '.');
  };

  const getMonthName = (month) => {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return monthNames[month - 1];
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Laporan Komisi Penitip
          </Typography>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              color="white"
              value={year}
              onChange={handleYearChange}
              className="mr-4"
              placeholder="Year"
              label="Tahun"
            />
            <Input
              type="number"
              color="white"
              value={month}
              onChange={handleMonthChange}
              className="mr-4"
              placeholder="Month"
              label="Bulan"
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 mx-10">
          {isLoading ? (
            <Typography className="text-center">Loading...</Typography>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-end items-center gap-4 p-4">
                {showPDFViewer && (
                  <div className="">
                  <Button
                    color="red"
                    buttonType="filled"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="py-2 px-4 mr-10"
                    onClick={handleClosePDFViewer}
                  >
                    Close PDF
                  </Button>
                </div>
                )}
                  <Button
                    color="green"
                    buttonType="filled"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    className="py-2 px-4 ml-5 mr-5"
                    onClick={handleViewPDF}
                  >
                    View PDF
                  </Button>
                <PDFDownloadLink
                  document={
                    <CetakKomisiPenitip
                      year={year}
                      month={month}
                      data={komisiPenitipData}
                    />
                  }
                  fileName={`Laporan_Komisi_Penitip_${getMonthName(month)}_${year}.pdf`}
                >
                  {({ loading }) => (
                    <Button
                      color="blue"
                      buttonType="filled"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      className="py-2 px-4"
                    >
                      {loading ? "Loading document..." : "Download PDF"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </div>
              {showPDFViewer ? (
                <div className="relative">
                  <PDFViewer width="100%" height="600px">
                    <CetakKomisiPenitip
                      year={year}
                      month={month}
                      data={komisiPenitipData}
                    />
                  </PDFViewer>
                </div>
              ) : (
                komisiPenitipData.map((penitipData, index) => (
                  <div key={index} className="mb-8">
                    <Typography variant="h6" className="mb-4">
                      Penitip: {penitipData.penitip}
                    </Typography>
                    <div className="overflow-x-auto">
                      <table className="w-full whitespace-nowrap table-auto">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">Nama Produk</th>
                            <th className="px-4 py-2">QTY</th>
                            <th className="px-4 py-2">Harga Jual</th>
                            <th className="px-4 py-2">Total</th>
                            <th className="px-4 py-2">Komisi</th>
                            <th className="px-4 py-2">Diterima</th>
                          </tr>
                        </thead>
                        <tbody>
                          {penitipData.produk.length > 0 ? (
                            penitipData.produk.map((produk, key) => (
                              <tr key={key} className={(key % 2 === 0) ? 'bg-gray-50' : 'bg-white'}>
                                <td className="border px-4 py-2">{produk.nama_produk}</td>
                                <td className="border px-4 py-2">{produk.jumlah_terjual}</td>
                                <td className="border px-4 py-2">{formatToRupiah(produk.harga_jual)}</td>
                                <td className="border px-4 py-2">{formatToRupiah(produk.total)}</td>
                                <td className="border px-4 py-2">{formatToRupiah(produk.komisi)}</td>
                                <td className="border px-4 py-2">{formatToRupiah(produk.diterima)}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="border px-4 py-2 text-center" colSpan="3">Data Tidak Ditemukan</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4">
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Total Harga: {formatToRupiah(penitipData.total)}
                      </Typography>
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Total Komisi: {formatToRupiah(penitipData.komisi)}
                      </Typography>
                      <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                        Total Diterima: {formatToRupiah(penitipData.diterima)}
                      </Typography>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ReadKomisiPenitip;
