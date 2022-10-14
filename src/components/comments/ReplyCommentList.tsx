import React, {useEffect, useRef} from 'react';
import Comment from './Comment'

interface props{
    comments: any;
}

const ReplyCommentList: React.FC<props> = ({comments}) => {

    if(!comments) return <div></div>
    return (
        <>
            {[...comments].reverse().map((comment:any,i:any,comments:any)=>{

               return <Comment key={comment.id} {...comment}/>
            })}
        </>
    );
};

export default ReplyCommentList;