import React from 'react';
// import ContentLoader from 'react-content-loader';

// import AppContext from '../../context';

import styles from './InputData.module.scss';

function InputData() {
    return (
        <div className='mb-5'>
            <label className={styles.textStudent}>ФИО:</label>
            <input className={styles.inputData}/>
        </div>
        
        

      );
}

export default InputData;