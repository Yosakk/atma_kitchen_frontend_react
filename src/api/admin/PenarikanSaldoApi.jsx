import urlAxios from "..";

export const showPenarikanSaldo = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/withdrawAllUser", {
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

export const storePenarikanSaldo = async (data, id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.post(`/withdrawAllUser/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}