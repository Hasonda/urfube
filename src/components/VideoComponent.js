import React from 'react';

const VideoComponent = (props) => {
    return (
        <div className="sector_videos_div videos">
            <div><a href={"/video/" + props.post.id}>{props.post.name}</a></div>
            <table>
                <tbody>
                <tr>
                    <td className="sector_videos_div_td">
                        <a href="">
                            <img className={'image_preview'} src={props.post.preview_url} alt=""/>
                        </a>
                    </td>
                    <td className="sector_videos_div_td_td">
                        <div className="sector_videos_div_td_td_st">
                            <div className='desc'>Описание: {props.post.description}</div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default VideoComponent;