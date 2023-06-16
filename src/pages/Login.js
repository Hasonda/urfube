import React, {useContext, useEffect, useState} from 'react';
import '../styles/Login.css'
import {Context} from "../index";

const Login = () => {
    useEffect(() => {
        document.title = 'Вход';
    }, []);
    const {store} = useContext(Context);

    const [regNickname, setRegNickname] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword1, setRegPassword1] = useState('')
    const [regPassword2, setRegPassword2] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <main>
            <h2>Присоединиться к Urfube</h2>
            <section className="main_left_login">
                <div id="suSignupDiv" className="contentBox">
                    <h2>Регистрация</h2>
                    <table className="dataEntryTableSmall">
                        <tbody>
                        <tr className="email">
                            <td className="formLabel">Почта:</td>
                            <td><input type="text" size="20" maxLength="60"
                                       placeholder={regEmail}
                                       onChange={e => {
                                           setRegEmail(e.target.value)
                                       }}/></td>
                        </tr>
                        <tr className="name">
                            <td className="formLabel">Ник:</td>
                            <td><input type="text" size="20" maxLength="20"
                                       placeholder={regNickname}
                                       onChange={e => {
                                           setRegNickname(e.target.value)
                                       }}/></td>
                        </tr>
                        <tr className="password">
                            <td className="formLabel">Пороль:</td>
                            <td><input type="password" size="20" maxLength="20"
                                       placeholder={regPassword1}
                                       onChange={e => {
                                           setRegPassword1(e.target.value)
                                       }}/></td>
                        </tr>
                        <tr className="password">
                            <td className="formLabel">Повтор пороля:</td>
                            <td><input type="password" size="20" maxLength="20"
                                       placeholder={regPassword2}
                                       onChange={e => {
                                           setRegPassword2(e.target.value)
                                       }}/></td>
                        </tr>
                        <tr className="">
                            <td className="formLabel"></td>
                            <td>
                                <button name="action_signup" type="submit"
                                        onClick={() => {
                                            store.registration(regEmail, regNickname, regPassword1)
                                        }}>
                                    Регистрация
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="main_right_login">
                <div id="suSignupDiv" className="contentBox">
                    <h2>Вход</h2>
                    <table>
                        <tbody>
                        <tr>
                            <td className="formLabel">Почта:</td>
                            <td>
                                <input type="text" size="20"
                                       placeholder={email}
                                       onChange={e => {
                                           setEmail(e.target.value)
                                       }}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="formLabel">Пороль:</td>
                            <td>
                                <input type="password" size="20"
                                       placeholder={password}
                                       onChange={e => {
                                           setPassword(e.target.value)
                                       }}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="formLabel"></td>
                            <td>
                                <button name="action_signup" type="submit" value=""
                                        onClick={() => store.login(email, password)}>
                                    Войти
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default Login;