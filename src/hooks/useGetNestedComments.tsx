import React, {useMemo} from 'react';
import {Comment} from "../interfaces/Post";

const UseGetNestedComments = (comments: Array<Comment>) => {
    const commentsByParentId = useMemo(() => {
        let group: any = {};
        //TODO create comment interface
        comments.forEach((comment: any) => {
            group[comment.parentId] ||= [];
            group[comment.parentId].push(comment)
        })
        return group;
    }, [comments])

    return (id:any) =>{
        return commentsByParentId[id]
    }
};

export default UseGetNestedComments;