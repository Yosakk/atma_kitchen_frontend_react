import urlAxios from "..";

export const showPemakaianBahanBaku = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get("/pemakaian/bahan/baku", {
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