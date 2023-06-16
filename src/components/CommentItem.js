import React from 'react';

const CommentItem = (props) => {
    return (
        <div className='comment d_bor'>
            <div className='comment_head'>
                <div className="comment_nickname">
                    <a href="">{props.comment.user_id}</a>
                </div>
                <div className='comment_date'>
                    <p>{props.comment.created_at}</p>
                </div>
            </div>
            <div>
                <p className="comment_text">{props.comment.text}</p>
            </div>
        </div>
    );
};

export default CommentItem;