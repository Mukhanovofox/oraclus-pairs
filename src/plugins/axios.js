import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BACKEND_API;

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000 * 12,
    withCredentials: false,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
});

export default instance;