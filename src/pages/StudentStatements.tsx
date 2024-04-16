import React from 'react';
import StudentList from '../components/StudentList';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { IStudentStatements } from '../models/IStudentStatements';
import { IRequest } from '../models/IRequest';
import { Context } from '..';
import { IStudentInfo } from '../models/IStudentInfo';
import { Table } from '@chakra-ui/react';

interface IStudentStatementsProps {
  searchValue: string;
  isLoading: boolean;
  options: IStudentInfo[];
  setOptions: React.Dispatch<React.SetStateAction<IStudentInfo[]>>;
  requests: IRequest[];
}

const StudentStatements: React.FC<IStudentStatementsProps> = ({
  searchValue,
  isLoading,
  setOptions,
  options,
  requests
}) => {
  const {store} = React.useContext(Context)
  const { branch } = useParams<{ branch: string }>();

  // const handleRemoveItem = (id: number) => {
  //   setOptions((prev) => prev.filter((item) => item.id !== id));
  // };

  

  const renderItems = () => {
    // Удаляем пробелы по бокам строки поиска
    const trimmedSearchValue = searchValue.trim();

    // Если значение для поиска не задано или не удовлетворяет ни одному элементу массива,
    // выводим все элементы
    // const itemsToRender = !trimmedSearchValue || options.filter((item) =>
    //   Object.values(item).some((value) =>
    //     typeof value === 'string' && value.toLowerCase().includes(trimmedSearchValue.toLowerCase())
    //   )
    // ).length === 0 ? options : options.filter((item) =>
    //   Object.values(item).some((value) =>
    //     typeof value === 'string' && value.toLowerCase().includes(trimmedSearchValue.toLowerCase())
    //   )
    // );
    // @ts-ignore
    const filteredItems = options.filter((item) => item.user.login?.toLowerCase().includes(searchValue.toLowerCase()) || item.user.name?.toLowerCase().includes(searchValue.toLowerCase()) ||  item.user.surname?.toLowerCase().includes(searchValue.toLowerCase()) ||  item.user.fatherName?.toLowerCase().includes(searchValue.toLowerCase()) ||  item.user.email?.toLowerCase().includes(searchValue.toLowerCase()) || item.group.name?.toLowerCase().includes(searchValue.toLowerCase()));

    // Если значение для поиска не задано или не удовлетворяет ни одному элементу массива,
    // выводим все элементы
    const itemsToRender = !searchValue || filteredItems.length === 0 ? options : filteredItems;
    return (isLoading ? [...Array(8)] : itemsToRender).map((item, index) => (
      // <StudentList
      //   key={item.id}
      //   id={item.id}
      //   name={`${item.user.surname} ${item.user.name[0]}.${item.user.fatherName[0]}.`}
      //   group={item.group.name}
      //   status={"Справка о месте обучения"}
      //   requests={requests[index]}
      //   // onRemoveItem={handleRemoveItem}
      <Table/>
      // />
    ));
  };

  return (
    <div>
      <div className="content p-40">
        <div className="d-flex justify-center mb-50">
          <h1>{store.selectedDepartmentName}</h1>
        </div>

        <div className="d-flex flex-wrap justify-center">
          <div className="d-flex blockFio align-center">
            <h5 className="text1">ФИО</h5>
            <h5 className="text2">Группа</h5>
            <h5 className="text3">Тип справки</h5>
          </div>

          {renderItems()}
    </div>
  </div>
</div>
);
};

export default StudentStatements;