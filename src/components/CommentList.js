import React from 'react';
import VideoComponent from "./VideoComponent";
import CommentItem from "./CommentItem";

const CommentList = (props) => {
    return (
        <>
            {props.comments.map(comm => <CommentItem comment={comm}/>)}
        </>
    );
};

export default CommentList;