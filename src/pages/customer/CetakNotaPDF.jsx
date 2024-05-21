import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { showDataNota } from "../../api/customer/TransaksiApi";
import logo from "../../assets/images/img0.png"; // Adjust the path to the logo file
import { useLocation, useParams } from "react-router-dom";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    // display: "flex",
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Center align items vertically
    backgroundColor: "#FF9F1C", // Add background color
    padding: 10, // Add padding to create space around elements
  },
  logo: {
    width: 120, // Increase logo size
    height: 120, // Increase logo size
  },
  titleA1: {
    fontSize: 24, // Increase font size for title
    fontWeight: "bold",
    color: "#fff", // Change text color to white
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E86C00",
    textAlign: "right",
  },
  section: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    color: "#555",
  },
  boldText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  table: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    borderBottom: 1,
    borderBottomColor: "#333",
    borderBottomStyle: "solid",
  },
  tableHeader: {
    backgroundColor: "#FF9F1C",
    padding: 5,
    border: 1,
    borderColor: "#333",
  },
  tableColumn: {
    flex: 1,
    fontSize: 12,
    color: "#333",
    padding: 5,
  },
  tableRightColumn: {
    flex: 1,
    fontSize: 12,
    color: "#333",
    textAlign: "right",
    padding: 5,
  },
  summaryContainer: {
    marginTop: 10,
  },
  summaryRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryColumn: {
    fontSize: 12,
    color: "#333",
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 10,
  },
});

// Utility function to handle null or undefined values
const getValueOrDefault = (value, defaultValue = "-") => {
  return value ?? defaultValue;
};

const CetakNotaPDF = () => {
  let { id } = useParams();
  console.log("masuk CetakPDF", id);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pointsUsed = queryParams.get("pointsUsed");
  const [isLoading, setIsLoading] = useState(true);
  const [notaData, setNotaData] = useState(null);
  const nilaiPoin = notaData?.pembayaran.poin_digunakan * 100;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await showDataNota(id); // Adjust this to the correct transaction ID
      setNotaData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image style={styles.logo} src={logo} />
            {/* <Text style={styles.titleA1}>Atma Kitchen</Text> */}
            <Text style={styles.titleA1}>
              Jl. Centralpark No. 10 Yogyakarta
            </Text>
          </View>

          {/* <View style={styles.header}>
            <Text style={styles.title}>
              Invoice # {getValueOrDefault(notaData?.nomor_nota)}
            </Text>
          </View> */}

          <View style={styles.section}>
            <Text style={styles.text}>
              Nomor Nota: {getValueOrDefault(notaData?.nomor_nota)}
            </Text>
            <Text style={styles.text}>
              Tanggal Pesan: {getValueOrDefault(notaData?.tanggal_transaksi)}
            </Text>
            <Text style={styles.text}>
              Lunas Pada:{" "}
              {getValueOrDefault(notaData?.pembayaran.tanggal_pembayaran)}
            </Text>
            <Text style={styles.text}>
              Tanggal Ambil: {getValueOrDefault(notaData?.tanggal_pengambilan)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.boldText}>PELANGGAN:</Text>
            <Text style={styles.text}>
              {getValueOrDefault(notaData?.user_by_pelanggan.nama_user)}
            </Text>
            <Text style={styles.text}>
              {getValueOrDefault(notaData?.user_by_pelanggan.email)}
            </Text>
            <Text style={styles.text}>
              {getValueOrDefault(notaData?.user_by_pelanggan.nomor_telepon)}
            </Text>
            <Text style={styles.text}>
              {getValueOrDefault(notaData?.alamat_pengiriman)}
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.table}>
              <Text style={[styles.tableColumn, styles.tableHeader]}>NAMA</Text>
              <Text style={[styles.tableColumn, styles.tableHeader]}>
                JUMLAH
              </Text>
              <Text style={[styles.tableColumn, styles.tableHeader]}>
                HARGA SATUAN
              </Text>
              <Text style={[styles.tableColumn, styles.tableHeader]}>
                SUB TOTAL
              </Text>
            </View>
            {notaData?.detail_transaksi.map((item, index) => {
              const namaProduk = item.produk
                ? item.produk.nama_produk
                : item.produk_hampers
                ? item.produk_hampers.nama_produk_hampers
                : "Produk tidak ditemukan";
              const hargaProduk = item.produk
                ? item.produk.harga_produk
                : item.produk_hampers
                ? item.produk_hampers.harga_produk_hampers
                : "-";

              return (
                <View style={styles.table} key={index}>
                  <Text style={styles.tableColumn}>
                    {getValueOrDefault(namaProduk)}
                  </Text>
                  <Text style={styles.tableColumn}>
                    {getValueOrDefault(item.jumlah_produk)}
                  </Text>
                  <Text style={styles.tableColumn}>
                    Rp {getValueOrDefault(hargaProduk).toLocaleString("id-ID")}
                  </Text>
                  <Text style={styles.tableColumn}>
                    Rp{" "}
                    {getValueOrDefault(
                      item.total_harga_transaksi
                    ).toLocaleString("id-ID")}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryColumn}>SUB TOTAL</Text>
              <Text style={styles.summaryColumn}>
                Rp{" "}
                {getValueOrDefault(notaData?.total_pembayaran).toLocaleString(
                  "id-ID"
                )}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryColumn}>Biaya Pengiriman</Text>
              <Text style={styles.summaryColumn}>
                Rp{" "}
                {getValueOrDefault(notaData?.biaya_pengiriman).toLocaleString(
                  "id-ID"
                )}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryColumn}>
                Potongan{" "}
                {getValueOrDefault(notaData?.pembayaran.poin_digunakan) > 0
                  ? `${notaData?.pembayaran.poin_digunakan} Poin`
                  : "0"} Poin
              </Text>
              <Text style={styles.summaryColumn}>
                {getValueOrDefault(nilaiPoin) > 0
                  ? `Rp -${nilaiPoin.toLocaleString("id-ID")}`
                  : "0"}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryColumn}>Total Transaksi</Text>
              <Text style={styles.summaryColumn}>
                Rp{" "}
                {(
                  getValueOrDefault(notaData?.total_pembayaran) +
                  getValueOrDefault(notaData?.biaya_pengiriman) -
                  nilaiPoin
                ).toLocaleString("id-ID")}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryColumn}>Jumlah Pembayaran</Text>
              <Text style={styles.summaryColumn}>
                Rp{" "}
                {getValueOrDefault(
                  notaData?.pembayaran.jumlah_pembayaran
                ).toLocaleString("id-ID")}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryColumn}>TIP</Text>
              <Text style={styles.summaryColumn}>
                Rp{" "}
                {getValueOrDefault(
                  notaData?.jumlah_tip + nilaiPoin
                ).toLocaleString("id-ID")}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryColumn}>Poin dari Pesanan ini</Text>
              <Text style={styles.summaryColumn}>
                {getValueOrDefault(notaData?.pembayaran.poin_reward)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryColumn}>Total Sisa Poin Customer</Text>
              <Text style={styles.summaryColumn}>
                {getValueOrDefault(notaData?.user.poin)}
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CetakNotaPDF;
