import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.center}>
      <div className={styles.loaderWrapper}>
        <div className={styles.spinner}/>
      </div>
    </div>
  );
};

export default Loader;
