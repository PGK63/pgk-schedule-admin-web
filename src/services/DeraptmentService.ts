import $api from "../http";
import { API_URL } from "../http";
import { AxiosResponse } from "axios";
import { IDepartement } from "../models/IDepartement";

export default class DepartmentService {
    static async fetchDepartments(): Promise<IDepartement[]> {
      const response = await $api.get<IDepartement[]>('/departments');
      return response.data.map((department) => ({
        ...department
      }));
    }
  }