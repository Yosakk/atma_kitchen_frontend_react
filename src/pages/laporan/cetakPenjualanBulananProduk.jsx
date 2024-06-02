import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    padding: 5,
    fontSize: 13,
  },
  tableColMerged: {
    width: '75%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    padding: 5,
  },
  tableCell: {
    margin: 'auto',
    fontSize: 10,
  },
});

const CetakPenjualanBulananProduk = ({ year, month, salesReport, totalSales }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Atma Kitchen</Text>
        <Text style={styles.subtitle}>Jl. Centralpark No. 10 Yogyakarta</Text>
        <Text style={styles.subtitle}>LAPORAN PENJUALAN BULANAN</Text>
        <Text style={styles.subtitle}>Bulan: {getMonthName(month)} Tahun: {year}</Text>
        <Text style={styles.subtitle}>
          Tanggal cetak: {new Date().toLocaleDateString('id-ID')}
        </Text>
      </View>
      
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Produk</Text>
          <Text style={styles.tableColHeader}>Kuantitas</Text>
          <Text style={styles.tableColHeader}>Harga</Text>
          <Text style={styles.tableColHeader}>Jumlah Uang</Text>
        </View>
        {salesReport.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{item.nama}</Text>
            <Text style={styles.tableCol}>{item.total_jumlah}</Text>
            <Text style={styles.tableCol}>{item.harga.toLocaleString('id-ID')}</Text>
            <Text style={styles.tableCol}>{item.total_penjualan.toLocaleString('id-ID')}</Text>
          </View>
        ))}
        <View style={styles.tableRow}>
          <Text style={styles.tableColMerged}>Total</Text>
          <Text style={styles.tableCol}>{totalSales.toLocaleString('id-ID')}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

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

export default CetakPenjualanBulananProduk;
