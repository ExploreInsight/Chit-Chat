import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.mode === 'development' ? 'http://localhost:7013/api' : '/api',
    withCredentials: true  // This allows cookies to be sent with requests, useful for authentication
})