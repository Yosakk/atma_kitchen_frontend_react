import urlAxios from "..";

export const showDataPembelianBahanBaku = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/pembelian_bahan", {
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
export const showDataPembelianBahanBakubyId = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/pembelian_bahan/${id}`, {
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

export const deletePembelianBahan = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/pembelian_bahan/${id}`, {
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
};
export const updatePembelianBahan = async (id, data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/pembelian_bahan/${id}`, data, {
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
};

export const storePembelianBahan = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/pembelian_bahan", data, {
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