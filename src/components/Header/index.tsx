import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { Context } from '../..';
import Dropdown from '../Dropdown';

const Header: React.FC = (props) => {
  const {store} = useContext(Context)
  const [activeModal, setActiveModal] = useState(false) 


  return (
    <header style={styles.header as React.CSSProperties} className="d-flex justify-between align-center p1vw">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={60} height={60} src="img/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase"></h3>
            <p className="opacity-5"></p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">

        <li className="mr-20 cu-p" onClick={()=> setActiveModal(!activeModal)}>
          <img width={22} height={22} src="img/user.svg" alt="Пользователь" />
        </li>

        {activeModal && (
          <Dropdown setActiveModal={setActiveModal} />
        )}
      </ul>
    </header>
  );
};

export default Header;
