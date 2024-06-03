import urlAxios from "..";

export const generateLaporanBulanan = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/laporan/penjualan/bulanan", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
export const generateLaporanBulananProduk = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/laporan/bulanan/produk", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
export const generateLaporanPenggunaanBahanBaku = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/laporan/pemakaian/bahan/baku", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}



export const generateLaporanStokBahanBaku = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/laporan/stok/bahan/baku", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log
        throw error.response.data;
    }
}

export const generateLaporanPemasukan = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/laporan/pemasukan/pengeluaran", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
export const generateLaporanPresensiPegawai = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/laporan/presensi/pegawai", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
