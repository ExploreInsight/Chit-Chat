import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.NODE_ENV === 'production' ? "/api" : 'http://localhost:7013/api',
    withCredentials: true  // This allows cookies to be sent with requests, useful for authentication
})