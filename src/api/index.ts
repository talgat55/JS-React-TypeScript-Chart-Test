import axios, { AxiosRequestConfig } from 'axios';
import {baseUrl} from "../constants";

const TIMEOUT = 50000;

const config: AxiosRequestConfig = {
    baseURL: baseUrl || '',
    timeout: TIMEOUT,
    withCredentials: true,
};

const instance = axios.create(config);
export const { Get } = {
    Get: instance.get,
};
export default instance;