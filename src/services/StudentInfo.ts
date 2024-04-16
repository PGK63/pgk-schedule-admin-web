import $api from "../http";
import { AxiosResponse } from "axios";
import { IStudentInfo } from "../models/IStudentInfo";

export default class StudentInfo {
    static fetchStudentById(name: string, offset: number): Promise<AxiosResponse<IStudentInfo>> {
        return $api.get<IStudentInfo>(`/teachers?name=${name}&offset=${offset}`);
    }
}