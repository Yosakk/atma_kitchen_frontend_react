import urlAxios from "..";

export const showDataPegawai = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/pegawai", {
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
export const showDataPegawaibyId = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/user/${id}`, {
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
export const updateGajiPegawai = async (id, data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/user/pegawai/${id}`, data, {
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
export const deletePegawai = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.delete(`/user/${id}`, {
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

export const storePegawai = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post("/registerPegawai", data, {
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