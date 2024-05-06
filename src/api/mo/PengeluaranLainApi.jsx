import urlAxios from "..";

export const showDataPengeluaranLain = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/pengeluaran_lain", {
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

export const deletePengeluaranLain = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/pengeluaran_lain/${id}`, {
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

export const storePengeluaranLain = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/pengeluaran_lain", data, {
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