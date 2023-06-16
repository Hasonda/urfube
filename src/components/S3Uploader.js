import React, {useState} from 'react';
import {Upload} from "@aws-sdk/lib-storage";
import {S3, S3Client} from "@aws-sdk/client-s3";
import $api from "../API/Instanse";


const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: 'ru-msk'
}
console.log(config)

const VIDEO_LIMIT = 1024 * 1024 * 250;
const PREVIEW_LIMIT = 1024 * 1024 * 10;
const s3url = 'https://tochka.hb.bizmrg.com/'
const S3Uploader = (props) => {
    const [preview, setPreview] = useState(null);
    const [video, setVideo] = useState(null);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const [showPreview, setShowPreview] = useState(null);
    const [previewProgress, setPreviewProgress] = useState(0.0)
    const [videoProgress, setVideoProgress] = useState(0.0)

    const handleFileInputPreview = (e) => {
        setPreview(e.target.files[0]);
        setShowPreview(URL.createObjectURL(e.target.files[0]));
    }
    const handleFileInputVideo = (e) => {
        setVideo(e.target.files[0]);
    }

    const handleUpload = async (file, path, setProgress) => {
        const s3cfg = {
            region: 'ru-msk',
            credentials: config,
            endpoint: 'https://hb.bizmrg.com/' + path,
        }
        const client = new S3(s3cfg) || new S3Client(s3cfg)

        try {
            const parallelUploads3 = new Upload({
                client: client,
                params: {
                    Bucket: config.bucketName,
                    Body: file,
                    Key: file.name
                },
                queueSize: 4,
                partSize: 1024 * 1024 * 5,
                leavePartsOnError: false,
            });
            console.log(parallelUploads3)
            parallelUploads3.on("httpUploadProgress", (progress) => {
                setProgress(Math.round(progress.loaded / progress.total * 100));
            });
            await parallelUploads3.done();
        } catch (e) {
            console.log(e);
        }
    }

    const handleLoads = () => {
        handleUpload(preview, 'previews', setPreviewProgress).then(r => console.log(r))
        handleUpload(video, 'videos', setVideoProgress).then(r => console.log(r))
        setPreviewProgress(0)
        setVideoProgress(0)
    }

    async function postVideo() {
        await $api.post('/video/', {
            "name": name,
            "s3_url": s3url + 'videos/' + video.name,
            "preview_url": s3url + 'previews/' + preview.name,
            "description": description,
        })
    }

    const checkFiles = () => {
        let lock = false;
        if (preview.size > PREVIEW_LIMIT) {
            lock = true
        }
        if (video.size > VIDEO_LIMIT) {
            lock = true
        }
        if (lock) {
            alert('Превышен размер файла')
        } else {
            postVideo()
            handleLoads()
        }
    }

    return <main>
        <section className="main_left main_left_w">
            <div className="contentBox">
                <table className="dataEntryTableSmall">
                    <tbody>
                    <tr className="buttons">
                        <td className="formLabel">
                            <input type="file" accept='image/jpeg,image/png' onChange={handleFileInputPreview}/>
                        </td>
                        <td className="formLabel">
                            <progress value={previewProgress} max="100"/>
                        </td>
                    </tr>
                    <tr className="buttons"><p>Максимальный размер превью 10Мб</p></tr>
                    <tr className="buttons">
                        <td className="formLabel">
                            <input type="file" accept='video/mp4' onChange={handleFileInputVideo}/>
                        </td>
                        <td className="formLabel">
                            <progress value={videoProgress} max="100"/>
                        </td>
                    </tr>
                    <tr className="buttons"><p>Максимальный размер видео 250Мб</p></tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td className="formLabel">Название видео:</td>
                        <td><input type="text" size="40"
                                   value={name}
                                   onChange={e => setName(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="formLabel">Описание:</td>
                        <td>
                            <textarea name="comment" cols="40" rows="3"
                                      value={description}
                                      onChange={e => setDescription(e.target.value)}>

                            </textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button className={'publish_btn'}
                        disabled={preview == null || video == null}
                        type="submit"
                        onClick={checkFiles}>
                    Опубликовать
                </button>
            </div>

        </section>

        <aside className="main_right main_right_w">
            <div>
                <img className={'img_preview'} src={showPreview} alt={''}/>
            </div>
        </aside>
    </main>
}


export default S3Uploader;