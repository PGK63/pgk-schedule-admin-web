import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponce } from "../models/responce/AuthResponse";
import $api, { API_URL } from "../http";
import DepartmentService from "../services/DeraptmentService";
import { IDepartement } from "../models/IDepartement";
import RequestsService from "../services/RequestsService";
import StudentInfo from "../services/StudentInfo";
import { IStudentInfo } from "../models/IStudentInfo";
import GenerateDocument from "../services/GenerateDocument";

export default class Store{
   role = ''; 
   isAuth = false;
   isLoading = false;
   clickedDepartemt: number[] = [];
   studentId:number[] = []
   selectedDepartmentName = [''];

   constructor(){
    makeAutoObservable(this);
   }

   setSelectedDepartmentName(name: string[]) {
    this.selectedDepartmentName = name;
  }

   setAuth(bool: boolean){
    this.isAuth = bool;
   }

   setRole(role: string){
    this.role = role;
   }
   setLoading(bool: boolean) {
    this.isLoading = bool;
   }

   setclickedDepartemt(id: number) {
    this.clickedDepartemt = [id];
   }

   async GenerateDocumentByID(id: number){
    this.setLoading(false);
    try{
        const responce = await GenerateDocument.downloadFile(id);
        console.log(responce)
        return responce
    } catch (e) {
        console.log(e.responce?.data?.message);
    }finally {
      this.setLoading(false);
    }
   }

   async getTeacherData(name: string, offset: number): Promise<IStudentInfo[]> {
    try {
        const response = await StudentInfo.fetchStudentById(name, offset);
        return [response.data]; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}


   async getDepartments(){
    this.setLoading(true);
    try{
        const responce = await DepartmentService.fetchDepartments();
        console.log(responce)
        return responce
    } catch (e) {
        console.log(e.responce?.data?.message);
    }finally {
      this.setLoading(false);
    }
   }

   async getRequests(){
    this.setLoading(true);
    try{
        const response = await RequestsService.fetchRequestsById(this.clickedDepartemt[0]);
        console.log(response)
        
        this.studentId.splice(0); // очищаем массив перед добавлением новых значений
      
        response.data.forEach((request) => {
          this.studentId.push(request.userId);
        });
        
        console.log(this.studentId)
        return response
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
        this.setRole(responce.data.role)
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
        this.setRole('')
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
        localStorage.setItem('accessTokenTime', String(new Date().getTime()));
        this.setAuth(true);
        this.setRole(response.data.role);
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