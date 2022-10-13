import React, {useContext, useEffect, useState} from 'react';
import {CommentContext} from "../../pages/Post/PostDetail";
import CommentList from "./CommentList";
import {useSelector} from "react-redux";
import {userState} from "../../redux/store";
import {DateTime} from 'luxon';
import avatar from '../../img/avatar.jpg'

enum Values {
    UPVOTE = 1,
    DOWNVOTE = -1
}

const Comment = ({id, content, createdAt, user, upvotes}: any) => {
    const {getComments, handleSocketComment, postId}: any = useContext(CommentContext)
    const {user: currentUser} = useSelector(userState)


    const [openedReply, setOpenedReply] = useState<boolean>(false);
    const [replyContent, setReplyContent] = useState<string>()


    const handleOpenReply = () => {
        setReplyContent('')
        setOpenedReply(!openedReply)
    }

    const handleUpvote = (value: Values) => {
        handleSocketComment({
            method: 'put',
            id,
            postId,
            value
        })
    }

    return (
        <>
            <div className='m-2'>
                <div className='border-2 p-2 '>
                    <img
                        src={user?.avatar ?(process.env.REACT_APP_BASEURL + user.avatar) : avatar}
                        alt="avatar" className='w-20 h-20 object-cover rounded-full' />
                    <div>
                        <div>
                        {DateTime.fromISO(createdAt).setLocale('en').toRelativeCalendar()}
                        {user.name + user.surname}
                    </div>
                        <p> {content}</p>
                    </div>


                    <div>
                        <div>
                            <span onClick={() => {
                                handleUpvote(Values.UPVOTE)
                            }}> Upvote ⬆️ </span>
                            <span onClick={() => {
                                handleUpvote(Values.DOWNVOTE)
                            }}> Downvote ⬇️ </span>
                            <span> {upvotes} </span>
                        </div>
                        {currentUser && <span className='cursor-pointer' onClick={handleOpenReply}>Reply</span>}
                        {(currentUser && user.id === currentUser.id) && <span className='text-red-600' onClick={() => {
                            handleSocketComment({
                                method: 'delete',
                                id
                            })
                        }}> Delete </span>}
                    </div>
                </div>
                {openedReply && <div>
                    <input type="text" value={replyContent} onChange={(e: any) => {
                        setReplyContent(e.currentTarget.value)
                    }}/>
                    <button className='__close-button' onClick={() => {
                        handleSocketComment({
                            method: 'post',
                            content: replyContent,
                            postId,
                            parentId: id
                        })
                        setOpenedReply(false)
                    }}>Send
                    </button>
                </div>}
            </div>
            <div>
                <CommentList comments={getComments(id)}/>
            </div>
        </>
    );
};

export default Comment;