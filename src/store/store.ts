import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { AuthResponce } from "../models/responce/AuthResponse";
import $api, { API_URL } from "../http";
import DepartmentService from "../services/DeraptmentService";
import { IDepartement } from "../models/IDepartement";
import StudentInfo, {TeacherPostData} from "../services/StudentInfo";
import { IStudentInfo } from "../models/IStudentInfo";


export default class Store{
   departments: IDepartement[] = [];
   isAuth = false;
   isLoading = false;

   constructor(){
    makeAutoObservable(this);
   }

   setDepartments(departments: IDepartement[]) {
    this.departments = departments;
  }


   setAuth(bool: boolean){
    this.isAuth = bool;
   }
   setLoading(bool: boolean) {
    this.isLoading = bool;
   }


   async getTeacherData(offset: number, search: string = ""): Promise<IStudentInfo[]> {
    try {
        const response = await StudentInfo.fetchStudentById(offset, search);
        console.log(response)
        if (response && response.data) {
            return [response.data]; 
        } else {
            throw new Error("No data received");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

    async add(data: TeacherPostData) {
        return await StudentInfo.add(data)
    }

    async update(id: number, data: TeacherPostData) {
        return await StudentInfo.update(data, id)
    }

   async getDepartments(){
    this.setLoading(true);
    try{
        // const responce = await DepartmentService.fetchDepartments();
        // this.setDepartments(responce);
        // console.log(responce)
        // return responce
    } catch (e) {
        console.log(e.responce?.data?.message);
    }finally {
      this.setLoading(false);
    }
   }

   async login(login: string, password: string){
    try{
        const responce = await AuthService.login(login, password);
        console.log(responce)
        localStorage.setItem('accessToken', responce.data.accessToken);
        localStorage.setItem('refreshToken', responce.data.refreshToken);
        this.setAuth(true);
    } catch (e) {
        console.log(e.responce?.data?.message);
    }
   }

   async logout(){
    try{
        // const responce = await AuthService.logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.setAuth(false);
    } catch (e) {
        console.log(e.responce?.data?.message);
    }
   }

//    async CheckAuth(){
//     this.setLoading(true);
//     try{
//         const responce = await $api.post<AuthResponce>(`/users/refresh-token`,{token: localStorage.getItem('refreshToken'), userId: 2})
//         console.log(responce)
//         localStorage.setItem('accessToken', responce.data.accessToken);
//         localStorage.setItem('refreshToken', responce.data.refreshToken)
//         this.setAuth(true);
//         this.setRole(responce.data.roles)
//     } catch (e) {
//         console.log(e.responce?.data?.message);
//     } finally {
//         this.setLoading(false);
//     }
// }

async CheckAuth() {
    this.setLoading(true);
    try {
      const accessTokenTime = localStorage.getItem('accessTokenTime');
      const tokenLifeTime = 300000; // 5 минут в миллисекундах
      const currentTime = new Date().getTime();
      const timeSinceAccessTokenObtained = currentTime - Number(accessTokenTime);
  
      if (timeSinceAccessTokenObtained >= tokenLifeTime) {
        const response = await $api.post<AuthResponce>(
          '/auth-service/auth/refresh',
          {},
          {
              headers: {
                  'refresh-token': localStorage.getItem('refreshToken')
              }
          }
      );
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('accessTokenTime', String(new Date().getTime()));
        this.setAuth(true);
      } else {
        this.setAuth(true);
      }
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
  
}