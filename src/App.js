import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/UI/Header";
import React, {useContext, useEffect} from "react";
import './styles/App.css';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Footer from "./components/UI/Footer";
import Login from "./pages/Login";
import './styles/style.css'
import Profile from "./pages/Profile";
import Video from "./pages/Video";
import Home from "./pages/Home";
import Upload from "./pages/Upload";

function App() {
    const context = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            context.store.isAuth = true;
        }
    }, [context.store]);

    return (<BrowserRouter>
        <Header isAuth={context.store.isAuth}/>
        <div className={'page'} id={'main-page'}>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/upload'} element={<Upload/>}/>
                <Route path={'/video/:id'} element={<Video/>}/>
                <Route path='*' element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
        <Footer/>
    </BrowserRouter>);
}

export default observer(App);
