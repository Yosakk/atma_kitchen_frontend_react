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
    width: '16.66%',
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
    width: '16.66%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    padding: 5,
    fontSize: 11,
  },
  tableColMerged: {
    width: '83.33%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: 'center',
    padding: 5,
    fontSize: 11,
    fontWeight: 'bold',
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

const CetakPresensiGaji = ({ year, month, presensiData }) => {
  const currentDate = new Date().toLocaleDateString('id-ID');

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Atma Kitchen</Text>
          <Text style={styles.subtitle}>Jl. Centralpark No. 10 Yogyakarta</Text>
          <Text style={styles.subtitle1}>LAPORAN Presensi Karyawan</Text>
          <Text style={styles.subtitle}>Bulan : {getMonthName(month)}</Text>
          <Text style={styles.subtitle}>Tahun : {year}</Text>
          <Text style={styles.subtitle}>Tanggal cetak: {currentDate}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            {["Nama", "Jumlah Hadir", "Jumlah Bolos", "Honor Harian", "Bonus Rajin", "Total"].map((header, index) => (
              <Text key={index} style={styles.tableColHeader}>{header}</Text>
            ))}
          </View>

          {presensiData.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{item.nama_pegawai}</Text>
              <Text style={styles.tableCol}>{item.jumlah_hadir}</Text>
              <Text style={styles.tableCol}>{item.jumlah_alpa}</Text>
              <Text style={styles.tableCol}>{item.honor_harian.toLocaleString('id-ID')}</Text>
              <Text style={styles.tableCol}>{item.bonus_rajin ? item.bonus_rajin.toLocaleString('id-ID') : '-'}</Text>
              <Text style={styles.tableCol}>{item.total_honor.toLocaleString('id-ID')}</Text>
            </View>
          ))}

          <View style={styles.tableRow}>
            <Text style={styles.tableColMerged}>Total</Text>
            <Text style={[styles.tableCol, styles.totalRow]}>{presensiData.reduce((sum, item) => sum + item.total_honor, 0).toLocaleString('id-ID')}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CetakPresensiGaji;
