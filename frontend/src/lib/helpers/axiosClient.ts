import axios, { AxiosBasicCredentials, AxiosResponse } from "axios";

const isSecure = process.env.NODE_ENV === 'production';

export const apiClient = axios.create({
    baseURL: `${isSecure ? 'https://' : "http://"}${process.env.BACKEND_URL}`,
})