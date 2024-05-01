import urlAxios from "..";

export const showDataCustomer = async () => {
    const token = sessionStorage.getItem("token");

    try {
        const response = await urlAxios.get("/show/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const editDataCustomer = async (data) => {
    const token = sessionStorage.getItem("token");

    try {
        const response = await urlAxios.put("/edit/profile", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; 
    } catch (error) {
        throw error.response.data;
    }
};
