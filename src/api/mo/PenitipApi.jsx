import urlAxios from "..";

export const showDataPenitip = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/penitip", {
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
export const showDataPenitipById = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/penitip/${id}`, {
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

export const UpdatePenitip = async (id, data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/penitip/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error updating penitip:", error.response.data);
        throw error.response.data;
    }
}

export const deletePenitip = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/penitip/${id}`, {
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

export const storeDataPenitip = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/penitip", data, {
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
