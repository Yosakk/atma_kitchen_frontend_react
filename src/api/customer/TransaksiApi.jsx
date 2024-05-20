import urlAxios from "..";

export const showTransaksiHistory = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/transaksiHistoryByAdmin1/${id}`, {
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
export const showTransaksiHistoryCustomer = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/transaksiHistory/historyPesananCustomer`, {
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
export const showAllTransaksiHistoryCustomer = async () => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.get(`/transaksiAll`, {
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

export const editStatusTransaksiDiantar = async (id, data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/edit/jarak/${id}`, data, {
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

export const editStatusTransaksiAdmin = async (id, data) => {
    const token = sessionStorage.getItem("token");
    try {
        const response = await urlAxios.put(`/edit/status/transaksi/admin/${id}`, data, {
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

export const editStatusTransaksiMO = async (id, data) => {
    const token = sessionStorage.getItem("token");
    console.log("ini idnya : ", id);
    console.log("ini datanya : ", data);
    try {
        const response = await urlAxios.put(`/edit/status/transaksi/MO/${id}`, data, {
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
