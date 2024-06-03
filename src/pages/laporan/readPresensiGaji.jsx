import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import CetakPemasukanPengeluaran from "./cetakPemasukanPengeluaran";
import { generateLaporanPresensiPegawai } from "../../api/admin/LaporanApi";

const ReadPresensiGaji = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [attendanceReport, setAttendanceReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, [year, month]);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const response = await generateLaporanPresensiPegawai({
        tahun: year,
        bulan: month,
      });
      setAttendanceReport(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching report data:", error);
      // toast.error("Failed to fetch attendance report");
      setIsLoading(false);
    }
  };

  const handleViewPDF = () => {
    setShowPDFViewer(true);
  };

  const handleClosePDFViewer = () => {
    setShowPDFViewer(false);
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
            Laporan Presensi dan Gaji Pegawai
          </Typography>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              color="white"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mr-4"
              placeholder="Year"
              label="Tahun"
            />
            <Input
              type="number"
              color="white"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="mr-4"
              placeholder="Month"
              label="Bulan"
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
                <Button
                  color="blue"
                  buttonType="filled"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  className="py-2 px-4"
                >
                  <PDFDownloadLink
                    // document={
                    //   <CetakPemasukanPengeluaran
                    //     year={year}
                    //     month={month}
                    //     attendanceReport={attendanceReport}
                    //   />
                    // }
                    fileName={`Laporan_Presensi_Gaji_${getMonthName(
                      month
                    )}_${year}.pdf`}
                  >
                    {({ loading }) =>
                      loading ? "Loading document..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                </Button>
              </div>
              {showPDFViewer ? (
                <div className="relative">
                  {/* <PDFViewer width="100%" height="600px">
                    <CetakPemasukanPengeluaran
                      year={year}
                      month={month}
                      attendanceReport={attendanceReport}
                    />
                  </PDFViewer> */}
                </div>
              ) : (
                <table className="w-full min-w-[640px] table-auto mt-4">
                  <thead>
                    <tr>
                      {[
                        "Nama Pegawai",
                        "Jumlah Hadir",
                        "Jumlah Alpa",
                        "Honor Harian",
                        "Bonus Rajin",
                        "Total Honor",
                      ].map((el) => (
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
                    {isLoading ? (
                      <tr>
                        <td
                          className="p-10 text-center text-xs font-semibold text-blue-gray-600"
                          colSpan="6"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : attendanceReport?.length >= 0 ? (
                      attendanceReport.map((item, key) => {
                        const className = `py-3 px-5 ${
                          key === attendanceReport.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={item.namaPegawai}>
                            <td className={className}>
                              <Typography
                                variant="small"
                                className="text-[11px] font-semibold text-blue-gray-600"
                              >
                                {item.namaPegawai}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {item.jumlahHadir}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {item.jumlahAlpa}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {item.honorHarian}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {item.bonusRajin}
                              </Typography>
                            </td>
                            <td className={className}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {item.totalHonor}
                              </Typography>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          className="p-10 text-center text-xs font-semibold text-blue-gray-600"
                          colSpan="6"
                        >
                          Data Tidak Ditemukan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {/* <div className="mt-4">
                <Typography className="text-right text-lg font-semibold ml-auto mr-10">
                  Total Honor Bulan {getMonthName(month)} Tahun {year} :{" "}
                  {attendanceReport.length > 0
                    ? attendanceReport
                        .reduce((acc, item) => acc + item.totalHonor, 0)
                        
                    : 0}
                </Typography>
              </div> */}
            </>
          )}
        </CardBody>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ReadPresensiGaji;
