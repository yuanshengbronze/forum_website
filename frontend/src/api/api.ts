import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
});

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
    
);

export default api;