import React from 'react';
import VideoComponent from "./VideoComponent";

const VideoList = (props) => {

    return (
        <>
            {props.videos.map(video => <VideoComponent post={video}/>)}
        </>
    );
};

export default VideoList;