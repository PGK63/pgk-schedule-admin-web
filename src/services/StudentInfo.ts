import $api from "../http";
import { AxiosResponse } from "axios";
import { IStudentInfo } from "../models/IStudentInfo";

export interface TeacherPostData {
    firstName: string;
    lastName: string;
    middleName?: string;
    cabinet?: string;
    departmentIds: number[];
}

export default class StudentInfo {
    static fetchStudentById(offset: number, name: string): Promise<AxiosResponse<IStudentInfo>> {
        return $api.get<IStudentInfo>(`/teachers?offset=${offset}&name=${name}`);
    }

    static deleteById(id: number) {
        return $api.delete(`/teachers/${id}`)
    }

    static add(data: TeacherPostData) {
        return $api.post('/teachers', data)
    }

    static update(data: TeacherPostData, id: number) {
        return $api.put(`/teachers/${id}`, data)
    }
}