import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponce } from "../models/responce/AuthResponse";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post('/auth-service/auth/login', {username, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
    
}