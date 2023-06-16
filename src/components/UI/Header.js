import React, {useContext} from 'react';
import '../../styles/Header.css'
import {Context} from "../../index";
import logo from "../../img/logo_tagline_sm.png"
import {Link} from "react-router-dom";

const Header = ({isAuth}) => {
    const {store} = useContext(Context);
    return (
        <header>
            <div>
                <div>
                    <a href="https://http.cat/status/410"><img src={logo} alt="YouTub" title="" id=""/></a>
                </div>
                <div className="pr_hd_bar">
                    <div className="sm_nav">
                        {isAuth
                            ? <Link to="/" onClick={() => store.logout()}>Выход</Link>
                            : <Link to="/login">Вход</Link>
                        }
                        <span> | </span>
                        <Link to="https://http.cat/418">Помощь</Link>
                    </div>
                    <div>
                        <input disabled={true} type="search" name="q" className="search_bar" maxLength="256"/>
                        <select disabled={true}>
                            <option>Видео</option>
                            <option>Каналы</option>
                        </select>
                        <input disabled={true} type="submit" className="search_button" value="Search"/>
                    </div>
                </div>
            </div>
            <div className="pr_hd_bar_ul">
                <ul>
                    <li className="pr_hd_bar_ul_li"><Link to="/" className="pr_hd_bar_ul_li_a">Главная</Link></li>
                    <li className="pr_hd_bar_ul_li"><Link to="https://http.cat/405" className="pr_hd_bar_ul_li_a">Каналы</Link></li>
                </ul>
                <div className="pr_hd_bar_a">
                    {isAuth
                        ? <>
                            <Link to="https://http.cat/405">Мои видео</Link><span> | </span>
                            <Link to="/upload">Загрузить Видео</Link><span> | </span>
                            <Link to="/profile">Мой профиль</Link>
                        </>
                        : <></>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;




