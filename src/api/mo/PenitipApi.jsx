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