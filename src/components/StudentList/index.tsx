import React, { useContext, useState } from 'react';
import { IRequest } from '../../models/IRequest';
import { Context } from '../..';

import styles from './StudentList.module.scss';
import $api, { API_URL } from '../../http';

interface StudentListProps {
  id: number;
  name: string;
  group: string;
  status: string;
  onRemoveItem: (id: number) => void;
  requests: IRequest;
  children?: React.ReactNode;
}

const StudentList: React.FC<StudentListProps> = ({ id, name, group, status, onRemoveItem, requests, children }) => {
  const [completeClick, setCompleteClick] = useState(false) 
  const {store} = useContext(Context)

  function handleDownload (e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    store.GenerateDocumentByID(requests.id);
}

  const handleRemoveClick = () => {
    setCompleteClick(prevComplete => {
      setTimeout(() => {
        onRemoveItem(id);
      }, 150);
      return !prevComplete;
    });
  }    
    
  return (
    <div className={styles.studentList}>
      <div className='d-flex justify-between align-center'>
        <h5 style={{width: '14.5vw'}}>{name}</h5>
        <h5>{group}</h5>
        <h5>{status}</h5>
      </div>

      <ul className="d-flex align-center">
        <li className="mr-30">
          <img className='img3vw' src="img/save.svg" alt="Закладки" onClick={(e) => handleDownload(e)} />
        </li>
        <li>
          <img className='img3vw' src={completeClick ? "img/completedBtn.svg" : "img/complete.svg"} onClick={handleRemoveClick} alt="Пользователь" />
        </li>
      </ul>
      {children}
    </div>
  );
}

export default StudentList;
