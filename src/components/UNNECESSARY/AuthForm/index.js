import React, { useState } from 'react';
import styles from './AuthForm.module.scss'
// import AppContext from '../../context';
import { useNavigate } from 'react-router-dom';
import Circle from '../Circle';

var url = "";

function AuthForm() {

  return (
<div className={styles.container}>
      <section className={styles.form}>
        <a className={styles.logo}><img src="./img/logo.png" width="120px" alt="email"
          /></a>
        <div className={styles.content}>
            <img width={421} height={421} src="img/auth_pic.svg" alt="Logotype" />
        </div>
      </section>
      <section className={styles.promo}>
        <div className={styles.box}>
          <div className={styles.content}>
          <img className='d-block mb-20 m-auto' width={123} height={126} src="img/logo.png" alt="Logotype" />
          <h5 className={styles.authTitle}>Авторизация</h5>
          <form action="#">
            <div className={styles.inputBox}>
              {/* <label className={styles.info} htmlFor="email">Имя пользователя</label> */}
              {/* <label className={styles.icon} htmlFor="email"
                ><img src="./img/svg/email.svg" alt="email"
              /></label> */}
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Введите ваше имя пользователя"
              />
            </div>
            <div className={styles.inputBox}>
              {/* <label className={styles.info} htmlFor="password">Пароль</label>
              <label className={styles.icon} htmlFor="password"
                ><img src="./img/svg/password.svg" alt="password"
              /></label> */}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Введите ваш пароль"
              />
            </div>
            <div className={styles.btnBox}>
              <button type="submit">Вход</button>
            </div>
          </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AuthForm;