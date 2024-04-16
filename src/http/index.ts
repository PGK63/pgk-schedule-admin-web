import axios from 'axios'
import Header from '../components/Header'
import { error } from 'console'
import { AuthResponce } from "../models/responce/AuthResponse";

export const API_URL = 'https://api.danbel.ru:30/pgk/schedule/v1.1'

const $api = axios.create({
    withCredentials: false,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    config.headers['X-API-KEY'] = '1ee8ad8c-fa65-4aaa-aac0-c3a7d56b8ede';
    return config;
})

$api.interceptors.response.use((config) => {
    return config;

}, async (error) => {
    const originalRequest = error.config
    if (error.responce.status == 404 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true
        try {
            const response = await $api.post<AuthResponce>(
                '/user/security/refresh',
                {},
                {
                    headers: {
                        'refresh-token': localStorage.getItem('refreshToken')
                    }
                }
            );
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Пользователь не авторизован!!!');
        }
    }
    throw error;
});

export default $api;