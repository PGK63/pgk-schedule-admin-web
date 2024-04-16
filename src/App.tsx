import React, { useContext, useEffect, useState } from 'react';
import Auth from './pages/Auth';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import StudentStatements from './pages/StudentStatements';
import AddStudent from './pages/AddStudent';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { IUser } from './models/IUser';
import { IStudentStatements } from './models/IStudentStatements';
import UserService from './services/UserService';
import Loader from './components/PageLoader';
import Header from './components/Header';
import { IDepartement } from './models/IDepartement';
import { useParams } from 'react-router-dom';
import { IRequest } from './models/IRequest';
import { IStudentInfo } from './models/IStudentInfo';
// import RaportichkaTable from "./pages/TablePage";

const App: React.FC = () => { 
  const { branch } = useParams<{ branch: string }>();  
    const {store} = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([]) 
    const [departments, setDepartments] = useState<IDepartement[]>([])
    const [searchValue, setSearchValue] = React.useState(''); 
    const [requests, setRequests] = React.useState<IRequest[]>([]);
    const [teacherData, setTeacherData] = React.useState<IStudentInfo[]>([]);

    async function fetchData(): Promise<void> {
      try {
        const [departmentsResponse, requestResponce, requestTeacher] = await Promise.all([store.getDepartments(), store.getRequests(), store.getTeacherData("",0)])
        if (departmentsResponse !== undefined) {
          setDepartments(departmentsResponse);
        }
        if (requestTeacher !== undefined) {
          setTeacherData(requestTeacher);
          console.log(requestTeacher)
        }
        if (requestResponce !== undefined) {
          setRequests(requestResponce.data);
        }

        if (requestResponce !== undefined) {
          setRequests(requestResponce.data);
        }
  
        // if (store.clickedDepartemt) {
        //   const studentData = await store.getTeacherData("",0);
        //   setTeacherData(studentData);
        // }
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }
  
    useEffect(() => {
      if(localStorage.getItem('accessToken')){
        store.CheckAuth()
      }
  
      fetchData();
  
    }, [store.clickedDepartemt])
  
    if (store.isLoading){
      return(<Loader/>)
    }


    async function getUsers() {
        try{
            const responce = await UserService.fetchUsers();
            setUsers(responce.data)
        } catch(e) {
            console.log(e);
        }
    }

    const onChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
      console.log(searchValue)
    };

    // const onRemoveItem = async (id: number): Promise<void> => {
    //   try {
    //     // await axios.delete(`https://60d62397943aa60017768e77.mockapi.io/cart/${id}`);
    //     setOptions((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    //   } catch (error) {
    //     alert('Ошибка при удаления');
    //     console.error(error);
    //   }
    // };



return (
<div className="clear">
{/* wrapper */}

{store.isAuth && <Header searchValue={searchValue} onChangeSearchInput={onChangeSearchInput} setSearchValue={setSearchValue}/>}

<Routes>
<Route path='/' element={
    store.isAuth ? (
      <Home isLoading={store.isLoading} searchValue={searchValue} items={teacherData}/>
    ) : (
        <Auth />
    )
  } />
{/* <Route path="/auth" element={<Auth />} /> */}
{/* <Route path='/table' element={
  <RaportichkaTable/>
}/> */}
<Route path="/add" element={
    store.isAuth ? (
      <AddStudent />
    ) : (
        <Navigate to='/' replace />
    )
  } />
{/* <Route path="/:branch" element={
    store.isAuth ? (
      <StudentStatements isLoading={store.isLoading} searchValue={searchValue} options={studentInfo} setOptions={setStudentInfo} requests={requests}/>
    ) : (
        <Navigate to='/' replace />
    )
  } /> */}
</Routes>
</div>
);
};

export default observer(App);