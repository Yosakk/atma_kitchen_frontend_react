import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
  },
  header: {
    textAlign: 'left',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 11,
    marginBottom: 2,
  },
  subtitle1: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 20,
    textDecoration: 'underline',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '16.66%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 3,
    fontSize: 11,
  },
  tableCol: {
    width: '16.66%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    padding: 3,
    fontSize: 11,
  },

  tableColMerged: {
    width: '83.32%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    textAlign: 'right',
  },
  totalRow: {
    fontWeight: 'bold',
  },
});

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

const formatToRupiah = (amount) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(amount).replace(/\s/g, '.').replace(/\,00/g, '');
};

const CetakKomisiPenitip = ({ data, month, year }) => {
  const currentDate = new Date().toLocaleDateString('id-ID');

  return (
    <Document>
      {data.map((penitipData, index) => {
        // Calculate total if not provided
        if (!penitipData.total) {
          penitipData.total = penitipData.produk.reduce((acc, cur) => acc + cur.total, 0);
        }

        return (
          <Page style={styles.page} key={index}>
            <View style={styles.header}>
              <Text style={styles.subtitle}>Atma Kitchen</Text>
              <Text style={styles.subtitle}>Jl. Centralpark No. 10 Yogyakarta</Text>
              <Text style={styles.subtitle1}>LAPORAN TRANSAKSI PENITIP</Text>
              <Text style={styles.subtitle}>ID Penitip : {penitipData.id_penitip}</Text>
              <Text style={styles.subtitle}>Nama Penitip : {penitipData.penitip}</Text>
              <Text style={styles.subtitle}>Bulan : {getMonthName(month)}</Text>
              <Text style={styles.subtitle}>Tahun : {year}</Text>
              <Text style={styles.subtitle}>Tanggal cetak: {currentDate}</Text>
            </View>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeader}>Nama</Text>
                <Text style={styles.tableColHeader}>Qty</Text>
                <Text style={styles.tableColHeader}>Harga Jual</Text>
                <Text style={styles.tableColHeader}>Total</Text>
                <Text style={styles.tableColHeader}>20% Komisi</Text>
                <Text style={styles.tableColHeader}>Yang Diterima</Text>
              </View>
              {penitipData.produk.map((produk, idx) => (
                <View style={styles.tableRow} key={idx}>
                  <Text style={styles.tableCol}>{produk.nama_produk}</Text>
                  <Text style={styles.tableCol}>{produk.jumlah_terjual}</Text>
                  <Text style={styles.tableCol}>{formatToRupiah(produk.harga_jual)}</Text>
                  <Text style={styles.tableCol}>{formatToRupiah(produk.total)}</Text>
                  <Text style={styles.tableCol}>{formatToRupiah(produk.komisi)}</Text>
                  <Text style={styles.tableCol}>{formatToRupiah(produk.diterima)}</Text>
                </View>
              ))}
              <View style={[styles.tableRow, styles.totalRow]}>
                <Text style={styles.tableColMerged}>Total</Text>
                <Text style={styles.tableCol}>{formatToRupiah(penitipData.diterima)}</Text>
              </View>
            </View>
          </Page>
        );
      })}
    </Document>
  );
};

export default CetakKomisiPenitip;
