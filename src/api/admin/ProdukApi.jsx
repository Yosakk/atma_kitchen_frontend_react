import urlAxios from "..";

export const showDataProduk = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/produk", {
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

export const showDataHampers = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/produk_hampers", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const storeDataProduk = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/produk", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.message.nama_produk[0];
            throw new Error(errorMessage);
        }
        throw error.response.data.message;
    }
}

export const storeDataHampers = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/produk_hampers", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const showDataPenitip = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/penitip", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

// export const getStokProduk = async () => {
//     const token = sessionStorage.getItem("token");
//     try{
//         const response = await urlAxios.get("/")
//     }catch(error){

//     }
// }

export const editDataProduk = async (id, data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/produk/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        throw error.response.data;
    }
}

export const deleteProduk = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/produk/${id}`, {
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

export const deleteProdukHampers = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/produk_hampers/${id}`, {
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