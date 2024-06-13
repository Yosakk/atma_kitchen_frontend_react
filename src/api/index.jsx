import axios from "axios"
export const Base_URL = "https://atmakitchenbackend.absensi-desa-mangeste.my.id";

export const getImage = (image) => {
    return `${Base_URL}/storage/hampers/${image}`;
};

export const getImageBuktiPembayaran = (image) => {
    return `${Base_URL}/storage/bukti_pembayaran/${image}`;
};

const urlAxios = axios.create({
    baseURL: `${Base_URL}/api`,
});
export default urlAxios;