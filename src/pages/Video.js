import React, {useEffect, useState} from 'react';
import '../styles/VideoPlayer.css'
import like from '../img/like.png'
import dislike from '../img/dislike.png'
import {useParams} from "react-router-dom";
import $api from "../API/Instanse";
import CommentList from "../components/CommentList";
import Right from "../components/right";

const Video = () => {
    useEffect(() => {
        document.title = 'Видео';
    }, []);
    const videoId = useParams();
    const [videoSrc, setVideoSrc] = useState('');
    const [views, setViews] = useState(0);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [name, setName] = useState('...');
    const [description, setDescription] = useState('...');
    const [commText, setCommText] = useState('')


    async function fetchVideo() {
        const video_data = await $api.get('/video/' + videoId.id)
        setVideoSrc(video_data.data.s3_url)
        setName(video_data.data.name)
        setDescription(video_data.data.description)
    }

    async function fetchViews() {
        const views = await $api.get('/views/' + videoId.id)
        setViews(views.data)
    }

    async function fetchComments() {
        const comments = await $api.get('/comments/' + videoId.id + "/?limit=1000")
        setComments(comments.data.reverse())
    }

    async function fetchLikes() {
        const likes = await $api.get('/likes/' + videoId.id)
        setLikes(likes.data.likes)
        setDislikes(likes.data.dislikes)
    }

    async function likeVideo(type: boolean) {
        await $api.post('/likes/', {video_id: videoId.id, like_type: type})
    }

    async function seeVideo() {
        await $api.post('/views/', {video_id: videoId.id})

    }

    async function addComment() {
        await $api.post('/comments/' + videoId.id, {
            text: commText,
            video_id: videoId.id
        })
        fetchComments()
    }

    useEffect(() => {
        fetchVideo()
        fetchViews()
        fetchComments()
        fetchLikes()
        seeVideo()
    }, [])
    return (
        <main className="main">
            <section className="main_left">
                <h2 className='videoName'>{name}</h2>
                <div>
                    <video src={videoSrc} controls className="d_video"></video>
                </div>
                <div className="d_bor description">
                    <h3>Описание:</h3>
                    <p>{description}</p>
                </div>
                <div className="d_bor views">
                    <div className="lik">
                        <p>Оцените это видео</p>
                        <div className='btn_grp'>
                            <h4>{likes}</h4>
                            <button className="but_llik" onClick={() => {
                                likeVideo(true)
                                fetchLikes()
                            }}>
                                <img src={like} alt=''/></button>
                        </div>
                        <div className='btn_grp'>
                            <h4>{dislikes}</h4>
                            <button className="but_llik" onClick={() => {
                                likeVideo(false)
                                fetchLikes()
                            }}>
                                <img src={dislike} alt=''/></button>
                        </div>
                    </div>
                    <div className='counter'>Просмотры: {views}</div>
                    <div className='counter'>Комментарии: {comments.length}</div>
                </div>
                <div>
                    <h3>Последние комментарии</h3>
                    <div className='comment d_bor'>
                        <div className='comment_head'>
                            <div className="comment_nickname">
                                <a>Добавить комментарий</a>
                            </div>

                        </div>
                        <div>
                            <p className="comment_text">
                                <div className='comment_add_head'>
                                    <textarea name="comment" cols="60" rows="3"
                                              onChange={e => setCommText(e.target.value)}></textarea>
                                </div>
                                <div className='comment_add_btn'>
                                    <button type='submit'
                                            disabled={commText === ''}
                                            onClick={addComment}>Отправить
                                    </button>
                                </div>
                            </p>

                        </div>
                    </div>
                    <CommentList comments={comments}/>
                </div>
            </section>
            <aside className="main_right">
                <div>
                    <div className="content_main_right">
                        <div className="content">Об этом видео</div>
                        <Right/>
                    </div>
                </div>
            </aside>

        </main>
    );
};

export default Video;