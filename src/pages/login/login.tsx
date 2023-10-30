import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import { InputText } from '../../components'
import { Button } from 'antd'
import withLogger from '../../hocs/withLogger'
//import {userContext} from '../../contexts/User'

const Login = () => {
    //Демонстрация доступности контекста
    //const value = useContext(userContext)
    //console.log('userContext', value)

    const [isSign, setSign] = useState<boolean>(false)
    
	const [userName, setUserName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
    const [userPass1, setUserPass1] = useState<string>('')
    const [userPass2, setUserPass2] = useState<string>('')

	const [userNameError, setUserNameError] = useState<string>('Допустимы цифры и англ. буквы')
	const [emailError, setEmailError] = useState<string>('Некорректный email') 
	const [passValidError, setPassValidError] = useState<string>('Допустимы только английские символы в нижнем регистре')
	const [isPassError, setPassError] = useState<boolean>(true)

	const [formValid, setFormValid] = useState<boolean>(false)
	
	const hendleChangeLogin = (event: any) => {
		setUserName(event.target.value)
		const re = /^[a-zA-Z0-9]+$/
		if (!re.test(event.target.value)){
			setUserNameError('Допустимы цифры и англ. буквы')
		} else {
			setUserNameError('')
		}
    }
	
	const handleChangeEmail = (event: any) => {
		setEmail(event.target.value)
		const re = /@/
		if (!re.test(event.target.value)){
			setEmailError('Некорректный email')
		} else {
			setEmailError('')
		}
	}
	  
    const handleChangePass1 = (event: any) => {
		setUserPass1(event.target.value)
        if (userPass2 === event.target.value) {
			setPassError(false)
        } else {
			setPassError(true)
        }
		const re = /^[a-z]+$/
		if (!re.test(event.target.value)){
			setPassValidError('Допустимы только английские символы в нижнем регистре')
		} else {
			setPassValidError('')
		}
    }
	
    const handleChangePass2 = (event: any) => {
        setUserPass2(event.target.value)
		if (userPass1 === event.target.value) {
			setPassError(false)
        } else {
			setPassError(true)
        }
    }

    useEffect(() => {
		if (userNameError || emailError || passValidError || isPassError){
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [userNameError, emailError, passValidError, isPassError])
	
    const handleClickSend = () => {
        fetch("http://localhost:3000/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: userName,
                password: userPass1,
            })
        })
            .then((response) => {
                console.log('send data user');
            });
    };

    const handleClickChangeSide = () => {
        setSign(!isSign);
    };


    const rightPanelActive = isSign ? 'container right-panel-active' : 'container';

    return (
        <>
            <div className={rightPanelActive} id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
						{/* ФОРМА РЕГИСТРАЦИИ */}
                        <h1>Соаздайте пользователя</h1>
                        <InputText 
							type="text" 
							placeholder="Введите логин"
							onChange={(e: any) => hendleChangeLogin(e)}
							/>
						{userNameError && <div style={{color: 'red'}}>{userNameError}</div>}
                        <InputText 
							type="email" 
							placeholder="Введите Email"
							onChange={(e: any) => handleChangeEmail(e)}
						/>
						{emailError && <div style={{color: 'red'}}>{emailError}</div>}
                        <InputText
                            type="text"
                            placeholder="Введите пароль"
                            onChange={(e: any) => handleChangePass1(e)}
                            />
						{passValidError && <div style={{color: 'red'}}>{passValidError}</div>}
                        <InputText
                            type="text"
                            placeholder="Введите пароль повторно" 
                            onChange={(e: any) => handleChangePass2(e)}
                            />
                        {isPassError && <div style={{color: 'red'}}>Пароли не совпадают</div>}
                        <button
							disabled={!formValid}
							onClick={handleClickSend}
						>Регистрация</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Войти</h1>
                        <InputText
                            type="email"
                            placeholder="Email"
                        />
                        <InputText type="password" placeholder="Пароль" />
                        <a href="#">Забыли пароль</a>
                        <button>Войти</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Добро пожаловать!</h1>
                            <p>Войдите в свой аккаунт</p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={handleClickChangeSide}
                            >Войти
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Привет, друг!</h1>
                            <p>Введите данные</p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={handleClickChangeSide}
                            >Регистрация</button>
                            <Button type="link">Button</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withLogger(Login)