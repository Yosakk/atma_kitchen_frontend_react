import urlAxios from "..";

export const showDataBahanBaku = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/bahan_baku", {
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

export const deleteBahanBaku = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/bahan_baku/${id}`, {
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

export const storeBahanBaku = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/bahan_baku", data, {
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
