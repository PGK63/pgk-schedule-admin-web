import React from 'react';
// import ContentLoader from 'react-content-loader';

import styles from './SearchBlock.module.scss';

interface SearchBlockProps {
  searchValue: string;
  onChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBlock: React.FC<SearchBlockProps> = (props) => {
  return (
    <div className={styles.searchBlock}>
      <img src="/img/search.svg" alt="Search" />
      <input
        type="text"
        placeholder="Поиск..."
        value={props.searchValue}
        onChange={props.onChangeSearchInput}
      />
    </div>
  );
}

export default SearchBlock;