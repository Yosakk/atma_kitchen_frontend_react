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
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
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
    padding: 5,
    fontSize: 12,
  },
  tableCol: {
    width: '33.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    padding: 5,
    fontSize: 11,
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

const CetakPemasukanPengeluaran = ({ year, month, salesReport, expensesReport }) => {
  const totalSales = salesReport.reduce((acc, item) => acc + item.total, 0);
  const totalExpenses = expensesReport.reduce((acc, item) => acc + item.total, 0);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Atma Kitchen</Text>
          <Text style={styles.subtitle}>Jl. Centralpark No. 10 Yogyakarta</Text>
          <Text style={styles.subtitle}>LAPORAN PEMASUKAN DAN PENGELUARAN</Text>
          <Text style={styles.subtitle}>Bulan : {getMonthName(month)}</Text>
          <Text style={styles.subtitle}>Tahun : {year}</Text>
          <Text style={styles.subtitle}>Tanggal cetak: {new Date().toLocaleDateString('id-ID')}</Text>
        </View>
        
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Keterangan</Text>
            <Text style={styles.tableColHeader}>Pemasukan</Text>
            <Text style={styles.tableColHeader}>Pengeluaran</Text>
          </View>
          {salesReport.map(({ nama, total }, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{nama}</Text>
              <Text style={styles.tableCol}>{total.toLocaleString("id-ID")}</Text>
              <Text style={styles.tableCol}></Text>
            </View>
          ))}
          {expensesReport.map(({ nama, total }, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{nama}</Text>
              <Text style={styles.tableCol}></Text>
              <Text style={styles.tableCol}>{total.toLocaleString("id-ID")}</Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, styles.totalRow]}>Total</Text>
            <Text style={[styles.tableCol, styles.totalRow]}>{totalSales.toLocaleString("id-ID")}</Text>
            <Text style={[styles.tableCol, styles.totalRow]}>{totalExpenses.toLocaleString("id-ID")}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CetakPemasukanPengeluaran;
