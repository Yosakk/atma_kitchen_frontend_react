  import { chartsConfig } from "@/configs";



  const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: [100, 20, 10, 22, 50, 10, 40],
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#388e3c",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["M", "T", "W", "T", "F", "S", "S"],
      },
    },
  };

  const dailySalesChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };

  const completedTaskChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#388e3c"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  const completedTasksChart = {
    ...completedTaskChart,
    series: [
      {
        name: "Tasks",
        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
      },
    ],
  };

  

  const PenjualanProdukChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: [100, 20, 100, 22, 50, 10, 40],
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#388e3c",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["M", "T", "W", "T", "F", "S", "S"],
      },
    },
  };
  const stokBahanBakuChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: [100, 20, 100, 22, 50, 10, 40],
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#388e3c",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["M", "T", "W", "T", "F", "S", "S"],
      },
    },
  };
  const penggunaanBahanBakuChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "Views",
        data: [100, 20, 100, 22, 50, 10, 40],
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#388e3c",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["M", "T", "W", "T", "F", "S", "S"],
      },
    },
  };

  const presensiChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#388e3c"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  const presensisChart = {
    ...presensiChart,
    series: [
      {
        name: "Tasks",
        data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
      },
    ],
  };

  const pemasukanChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  const penitipChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#0288d1"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };

  const penjualanBulananChart =  {
    type: "line",
    height: 220,
    series: [
      {
        name: "Penjualan",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500, 200, 230, 500],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#388e3c"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  const penjualanBulanansChart = {
    ...penjualanBulananChart,
    
    series: [
      {
        name: "Penjualan",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500, 200, 230, 500],
      },
    ],
  };

  export const statisticsChartsData = [
    {
      color: "white",
      title: "Penjualan Bulanan",
      description: "Laporan penjualan bulanan secara keseluruhan",
      footer: "just updated",
      chart: penjualanBulanansChart,
    },
    {
      color: "white",
      title: "Penjualan Produk",
      description: "Laporan penjualan bulanan per Produk",
      footer: "campaign sent 2 days ago",
      chart: PenjualanProdukChart,
    },
    {
      color: "white",
      title: "Stok Bahan Baku",
      description: "Stok Bahan Baku",
      footer: "updated 4 min ago",
      chart: stokBahanBakuChart,
    },
    {
      color: "white",
      title: "Penggunaan Bahan Baku",
      description: "Penggunaan Bahan Baku",
      footer: "just updated",
      chart: penggunaanBahanBakuChart,
    },
    {
      color: "white",
      title: "Presensi Pegawai",
      description: "Laporan Presensi Pegawai",
      footer: "campaign sent 2 days ago",
      chart: presensisChart,
    },
    {
      color: "white",
      title: "Pemasukan Dan Pengeluaran",
      description: "Laporan Pemasukan dan Pengeluaran",
      footer: "updated 4 min ago",
      chart: pemasukanChart,
    },
    {
      color: "white",
      title: "Transaksi Penitip",
      description: "Transaksi Penitip",
      footer: "updated 4 min ago",
      chart: penitipChart,
    },
  ];

  export default statisticsChartsData;
