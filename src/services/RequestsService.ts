import $api from "../http";
import { API_URL } from "../http";
import { AxiosResponse } from "axios";
import { IRequest } from "../models/IRequest";

export default class RequestsService {
    static fetchRequestsById(depId: number): Promise<AxiosResponse<IRequest[]>> {
        return $api.get<IRequest[]>(`/requests/by-department-id?depId=${depId}`);
    }
}