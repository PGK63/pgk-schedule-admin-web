import React, { useState } from "react";
import Header from '../components/Header';

type AddSStudentState = {
  fio: string;
  group: string;
  department: string;
  budgetOrFee: string;
  speciality: string;
  familyStatus: string;
  login: string;
  password: string;
  parentsPhone: string;
  phone: string;
  nameOfParents: string;
};

const AddStudent: React.FC = () => {

  const [state, setState] = useState<AddSStudentState>({
    fio: "",
    group: "",
    department: "",
    budgetOrFee: "",
    speciality: "",
    familyStatus: "",
    login: "",
    password: "",
    parentsPhone: "",
    phone: "",
    nameOfParents: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!state.fio || !state.group || !state.department || !state.budgetOrFee || !state.speciality || !state.familyStatus || !state.login || !state.password || !state.parentsPhone || !state.phone || !state.nameOfParents) {
      alert("Для создания нового студента заполните все его данные");
      return;
    }
    try {
      const response = await fetch("https://example.com/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });
      if (response.ok) {
        alert("Новый студент успешно добавлен");
        setState({
          fio: "",
          group: "",
          department: "",
          budgetOrFee: "",
          speciality: "",
          familyStatus: "",
          login: "",
          password: "",
          parentsPhone: "",
          phone: "",
          nameOfParents: "",
        });
      } else {
        alert("Произошла ошибка при добавлении студента");
      }
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка при добавлении студента");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
        {/* <Header/> */}
    <div className="content p1vw">
        <div className="d-flex justify-center mb2vw">
            <h1>Добавить студента</h1>
        </div>
        <div className='d-flex flex-wrap justify-center'>
        <form onSubmit={handleSubmit}>

          <div className='mb-5'>
              <label className='textStudent'>ФИО:</label>
              <input className='inputData' type="text" name="fio" value={state.fio} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Группа:</label>
              <input className='inputData' type="text" name="group" value={state.group} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Отделение:</label>
              <input className='inputData' type="text" name="department" value={state.department} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Бюджет/Платники:</label>
              <input className='inputData' type="text" name="budgetOrFee" value={state.budgetOrFee} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Специалность:</label>
              <input className='inputData' type="text" name="speciality" value={state.speciality} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Семейное положение:</label>
              <input className='inputData' type="text" name="familyStatus" value={state.familyStatus} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Логин(номер зач/книжки):</label>
              <input className='inputData' type="text" name="login" value={state.login}onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Пароль:</label>
              <input className='inputData' type="text" name="password" value={state.password} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Род телефон:</label>
              <input className='inputData' type="text" name="parentsPhone" value={state.parentsPhone} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>Телефон:</label>
              <input className='inputData' type="text" name="phone" value={state.phone} onChange={handleChange}/>
          </div>
          <div className='mb-5'>
              <label className='textStudent'>ФИО/род:</label>
              <input className='inputData' type="text" name="nameOfParents" value={state.nameOfParents} onChange={handleChange}/>
          </div>

          <div className="d-flex justify-center">
            <button type="submit"><img src="img/addStudentBtn.svg" alt="Закладки" /></button>           
          </div>
        </form>
      </div>
    </div>
</div>
);
}

export default AddStudent;