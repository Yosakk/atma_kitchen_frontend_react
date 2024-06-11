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
    fontSize: 12,
    marginBottom: 5,
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
});

const CetakPenggunaanBahan = ({ tanggalAwal, tanggalAkhir, penggunaanBahanData }) => {
  const currentDate = new Date().toLocaleDateString('id-ID');

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Atma Kitchen</Text>
          <Text style={styles.subtitle}>Jl. Centralpark No. 10 Yogyakarta</Text>
          <Text style={styles.subtitle1}>LAPORAN Penggunaan Bahan Baku</Text>
          <Text style={styles.subtitle}>Periode : {tanggalAwal} - {tanggalAkhir}</Text>
          <Text style={styles.subtitle}>Tanggal cetak: {currentDate}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Nama Bahan</Text>
            <Text style={styles.tableColHeader}>Satuan</Text>
            <Text style={styles.tableColHeader}>Digunakan</Text>
          </View>

          {penggunaanBahanData.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{item.nama_bahan_baku}</Text>
              <Text style={styles.tableCol}>{item.satuan_bahan_baku}</Text>
              <Text style={styles.tableCol}>{item.total_jumlah_pemakaian}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CetakPenggunaanBahan;