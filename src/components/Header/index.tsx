import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { Context } from '../..';
import Dropdown from '../Dropdown';

interface HeaderProps {
  searchValue: string;
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = (props) => {
  const {store} = useContext(Context)
  const [activeModal, setActiveModal] = useState(false) 
  const [showSearchBlock, setShowSearchBlock] = useState(true);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/add') {
      setShowSearchBlock(false);
    } else {
      setShowSearchBlock(true);
    }
  }, [location]);

  return (
    <header style={styles.header as React.CSSProperties} className="d-flex justify-between align-center p1vw mb2vw">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase"></h3>
            <p className="opacity-5"></p>
          </div>
        </div>
      </Link>

      {showSearchBlock && (
        <div className="justify-center">
          <div className={styles.searchBlock}>
            <img src="/img/search.svg" alt="Search" />
            {props.searchValue && (
              <img
                onClick={() => props.setSearchValue('')}
                className={styles.btnRemove}
                src="img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input
              type="text"
              placeholder="Поиск..."
              value={props.searchValue}
              onChange={(event) => props.setSearchValue(event.target.value)}
            />
          </div>
        </div>
      )}

      <ul className="d-flex">
        {/* <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="img/cart.svg" alt="Корзина" />
        </li> */}

        <li className="mr-20 cu-p">
          <Link to="/add">
            <img width={18} height={18} src="img/edit.svg" alt="Закладки" />
          </Link>
        </li>

        <li className="mr-20 cu-p" onClick={()=> setActiveModal(!activeModal)}>
          <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
        </li>

        {activeModal && (
          <Dropdown setActiveModal={setActiveModal} />
        )}
      </ul>
    </header>
  );
};

export default Header;
