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
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

const CetakStokBahanBaku = ({ data }) => {
  const formatDate = (date) => {
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
  };

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Atma Kitchen</Text>
          <Text style={styles.subtitle}>Jl. Centralpark No. 10 Yogyakarta</Text>
          <Text style={styles.subtitle1}>LAPORAN Stok Bahan Baku</Text>
          <Text style={styles.subtitle}>Tanggal cetak: {formatDate(new Date())}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Nama Bahan</Text>
            <Text style={styles.tableColHeader}>Satuan</Text>
            <Text style={styles.tableColHeader}>Stok</Text>
          </View>
          {data.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{item.nama}</Text>
              <Text style={styles.tableCol}>{item.satuan}</Text>
              <Text style={styles.tableCol}>{item.stok}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CetakStokBahanBaku;