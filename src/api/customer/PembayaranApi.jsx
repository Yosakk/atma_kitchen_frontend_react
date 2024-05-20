import urlAxios from "..";

export const showPembayaran = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/pembayaran/${id}`, {
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