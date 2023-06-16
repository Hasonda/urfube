import React, {useEffect, useState} from 'react';
import '../styles/Home.css'
import thumbnail from "../img/1.jpg"
import VideoList from "../components/VideoList";
import $api from "../API/Instanse";
import Right from "../components/right";

const Home = () => {
    useEffect(() => {
        document.title = 'Главная';
    }, []);
    const [resp, setResp] = useState([]);

    async function fetchVideos() {
        const response = await $api.get('/video/?skip=0&limit=100')
        setResp(response.data)

    }

    useEffect(() => {
        fetchVideos()
    }, [])


    return (
        <main>
            <section className="main_left">
                <div className="placeholder top">
                    <p className="ph_p">Рекомендуемые видео</p>
                    <a href="" className="ph_a">Увидеть больше видео</a>
                </div>
                <VideoList videos={resp}/>
                <div className="placeholder bottom">
                    <a href="" className='ph_a'>Увидеть больше видео</a>
                </div>
            </section>

            <aside className="main_right">
                <div className="content_main_right">
                    <div className="content">Транслируйте себя на Urfube</div>
                    <Right/>
                </div>
                <div className="content_main_right">
                    <div className="content">Что нового на Urfube</div>
                    <div className="content_main_right_cont_d">
                        <div>
                            <a href="https://http.cat/images/402.jpg">что-то</a>
                            <p>Здесь вы можете узнать о наших навыках!!!</p>
                        </div>
                        <div>
                            <a href="https://http.cat/images/418.jpg">что-то</a>
                            <p>Мне не платят за то чтобы я писал сюда текст</p>
                        </div>
                        <div>
                            <div className="d_s_f"><a href="">Прочитать блог</a></div>
                            <div><a href="https://http.cat/status/305.jpg">Посмотреть на забавного котика</a></div>
                        </div>
                    </div>
                </div>
                <div className="content_main_right">
                    <p className="content_main_right_p">Поставьте нам хорошие баллы!!!</p>
                </div>
                <div className="content_main_right">
                    <div className="content">Активные каналы</div>
                    <div className="content_d_p">
                        <div className="content_d_p_mb">
                            <div className="content_d_p_mb_d">
                                <div className="s_f_l">
                                    <a href="https://http.cat/status/404.img"><img src={thumbnail} alt="" className="s_w"/></a>
                                </div>
                                <div className="s_f_l_ml">
                                    <a href="https://http.cat/status/408.jpg">Есть идеи почему мы забыли о этой части сайта?</a>
                                    <p>3 видео | 3 подписчика</p>
                                </div>
                            </div>
                        </div>
                        <div className="pr_hd_bar">
                            <a href="https://http.cat/status/408.jpg">Увидеть больше каналов</a>
                        </div>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default Home;