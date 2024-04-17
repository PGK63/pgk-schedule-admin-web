import $api from "../http";
import { AxiosResponse } from "axios";
import { IStudentInfo } from "../models/IStudentInfo";

export default class StudentInfo {
    static fetchStudentById(offset: number): Promise<AxiosResponse<IStudentInfo>> {
        return $api.get<IStudentInfo>(`/teachers?offset=${offset}`);
    }
}