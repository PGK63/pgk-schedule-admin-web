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
        return $api.get<IStudentInfo>(`/teacher-service?offset=${offset}&name=${name}`);
    }

    static deleteById(id: number) {
        return $api.delete(`/teacher-service/${id}`)
    }

    static add(data: TeacherPostData) {
        return $api.post('/teacher-service', data)
    }

    static update(data: TeacherPostData, id: number) {
        return $api.put(`/teacher-service/${id}`, data)
    }
}