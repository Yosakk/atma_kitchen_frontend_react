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