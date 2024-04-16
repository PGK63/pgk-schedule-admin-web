import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.scss';
import { Context } from '../..';

interface CardProps {
  link: string;
  imageUrl: string;
  title: string;
}

const Card: React.FC<CardProps> = ({link, imageUrl, title}) => {
  const {store} = React.useContext(Context)

  const handleClick = () => {
    store.setclickedDepartemt(Number(link));
    store.selectedDepartmentName = [title];
  }

  return (
    <div className={styles.card}>
      <Link to={`/${link}`} onClick={handleClick}>
        <img className={styles.blocktext} src={imageUrl} alt="Sneakers" />
      </Link>
      <h5 className='text-center'>{title}</h5>
      <div className="d-flex justify-between align-center">
        {/* <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>12 999 руб.</b>
        </div> */}
        {/* <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button> */}
      </div>
    </div>
  );
}

export default Card;
