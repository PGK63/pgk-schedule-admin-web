import React, { useContext } from 'react';
import styles from './Dropdown.module.scss'
import { Context } from '../..';

interface Option {
  id: number;
  content: string;
}

const options: Option[] = [
  { id: 1, content: 'Выход' },
];

interface DropdownProps {
  setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({ setActiveModal }) => {
  const { store } = useContext(Context);

  const handleOptionClick = (option: Option) => {
    setActiveModal(false);

    if (option.id === 1) {
      // perform logout action here
      store.logout()
    }
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.content}>
        {options.map((option) => (
          <div key={option.id} onClick={() => handleOptionClick(option)} className={styles.item}>
            {option.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
