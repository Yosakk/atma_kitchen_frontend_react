import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    textAlign: 'left',
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
  subtitle1: {
    fontSize: 12,
    marginBottom: 5,
    marginTop: 20,
    textDecoration: 'underline',
    fontWeight: 'bold',
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
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    fontSize: 14,
  },
  tableColMerged: {
    width: '66.66%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'right',
    padding: 5,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

const CetakPenjualanBulanan = ({ year, salesReport, totalSales }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Atma Kitchen</Text>
        <Text style={styles.subtitle}>Jl. Centralpark No. 10 Yogyakarta</Text>
        <Text style={styles.subtitle1}>LAPORAN PENJUALAN BULANAN</Text>
        <Text style={styles.subtitle}>Tahun: {year}</Text>
        <Text style={styles.subtitle}>
          Tanggal cetak: {new Date().toLocaleDateString('id-ID')}
        </Text>
      </View>
      
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Bulan</Text>
          <Text style={styles.tableColHeader}>Jumlah Transaksi</Text>
          <Text style={styles.tableColHeader}>Jumlah Uang</Text>
        </View>
        {salesReport.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{item.bulan}</Text>
            <Text style={styles.tableCol}>{item.total_transaksi}</Text>
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

export default CetakPenjualanBulanan;
