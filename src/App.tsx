import React, { useContext, useEffect } from 'react';
import Auth from './pages/Auth';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import Loader from './components/PageLoader';
import Header from './components/Header';
import { IStudentInfo } from './models/IStudentInfo';

const App: React.FC = () => {
    const {store} = useContext(Context)
    const [teacherData, setTeacherData] = React.useState<IStudentInfo[]>([]);

    async function fetchData(): Promise<void> {
      try {
        const [requestTeacher] = await Promise.all([store.getTeacherData(0)])
        if (requestTeacher !== undefined) {
          setTeacherData(requestTeacher);
          console.log(requestTeacher)
        }
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
    }, [])
  
    if (store.isLoading){
      return(<Loader/>)
    }
return (
<div className="clear">

{store.isAuth && <Header/>}

<Routes>
<Route path='/' element={
    store.isAuth ? (
      <Home isLoading={store.isLoading} items={teacherData}/>
    ) : (
        <Auth />
    )
  } />

</Routes>
</div>
);
};

export default observer(App);