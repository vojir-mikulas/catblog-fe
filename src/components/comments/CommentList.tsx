import React from 'react';
import Comment from './Comment'

interface props{
    comments: any
}

const CommentList: React.FC<props> = ({comments}) => {
    if(!comments) return <div></div>
    return (
        <>
            {comments.map((comment:any)=>(
                <Comment key={comment.id} {...comment}/>
            ))}
        </>
    );
};

export default CommentList;