import axios from "axios"
export const Base_URL = "http://127.0.0.1:8000";

export const getImage = (image) => {
    console.log(`${image}`);
    return `${image}`;
};

const urlAxios = axios.create({
    baseURL: `${Base_URL}/api`,
});
export default urlAxios;