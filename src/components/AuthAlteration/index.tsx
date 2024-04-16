import React, { useContext, useState } from 'react';
import styles from './AuthAlteration.module.scss'
import { Context } from '../..';
import {observer} from "mobx-react-lite";

interface AuthAlterationProps {}

const AuthAlteration: React.FC = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const {store} = useContext(Context)

  return (
    <div className={styles.all}>
	<div className={styles.basic}>
		<div className={styles.circle}>
		</div>
		<div className={styles.circleSecond}>
		</div>
		<div className={styles.circleThird}>
		</div>
		<div className={styles.circleFourth}>
		</div>
		</div>
	
		<div className={styles.container}>

			<div className={styles.wrap}>
				<div className={styles.loginPic}>
					<img width="320" src="./img/auth_pic.svg" alt="IMG"/>
				</div>

				<div className={styles.loginForm}>
					<div className={styles.box}>
						<div className={styles.content}> 
							<div className={styles.logo}><img width="123" height="126" src="./img/logo.png" alt="Logotype" /></div>
							<div className={styles.authTitle}><h5>Авторизация</h5></div>
						  <div className={styles.inputBox}>
							<input
							  onChange={e => setLogin(e.target.value)}
							  value={login}
							  type="text"
							  name="login"
							  id="login"
							  placeholder="Введите ваше имя пользователя"
							/>
						  </div>
						  <div className={styles.inputBox}>
							<input
							onChange={e => setPassword(e.target.value)}
							  value={password}
							  type="password"
							  name="password"
							  id="password"
							  placeholder="Введите ваш пароль"
							/>
						  </div>
						  <div className={styles.btnBox}>
							<button onClick={() => store.login(login, password)} className={styles.btnAuth}>Вход</button>
						  </div>
						</div>
					  </div>
				</div>
			</div>
		</div>
</div>
  );
}

export default observer(AuthAlteration);