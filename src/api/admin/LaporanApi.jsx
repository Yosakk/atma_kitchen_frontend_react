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
