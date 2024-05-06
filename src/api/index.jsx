import axios from "axios"
export const Base_URL = "http://127.0.0.1:8000";

export const getImage = (image) => {
    return `${Base_URL}/storage/hampers/${image}`;
};

const urlAxios = axios.create({
    baseURL: `${Base_URL}/api`,
});
export default urlAxios;