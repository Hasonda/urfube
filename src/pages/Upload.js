import React, {useEffect} from 'react';
import '../styles/Upload.css'
import S3Uploader from "../components/S3Uploader";

const Upload = () => {
    useEffect(() => {
        document.title = 'Загрузка видео';
    }, []);
    return (
        <S3Uploader/>
    );
};

export default Upload;