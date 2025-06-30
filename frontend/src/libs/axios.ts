import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    // baseURL: '/server',
    // withCredentials: true,
})
