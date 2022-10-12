import React, {useContext, useEffect, useState} from 'react';
import {CommentContext} from "../pages/Post/PostDetail";
import CommentList from "./CommentList";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {userState} from "../redux/store";
import Cookies from "universal-cookie";
import {io, Socket} from "socket.io-client";

const Comment = ({id, content, createdAt, user}: any) => {
    const {getComments, handleSocketComment, postId}: any = useContext(CommentContext)
    const {user: currentUser} = useSelector(userState)


    const [openedReply, setOpenedReply] = useState<boolean>(false);
    const [replyContent, setReplyContent] = useState<string>()

    const [upvotes, setUpvotes] =useState<number>();
    const [socket,setSocket] = useState<Socket>();

    const handleOpenReply = () => {
        setReplyContent('')
        setOpenedReply(!openedReply)
    }

    //Socket init
    useEffect(() => {
        const wsUrl: string = process.env.REACT_APP_COMMENT_WS_URL ? process.env.REACT_APP_COMMENT_WS_URL : 'http://localhost:3002';
        const cookie = new Cookies;
        const access_token = cookie.get('access_token')
        const newSocket = io(wsUrl,{
            extraHeaders: {
                Authorization: `Bearer ${access_token}`
            }})
        setSocket(newSocket)
    }, [process.env.REACT_APP_COMMENT_WS_URL])
    //Socket listener
    const upvoteListener = (upvotes: any) => {
        console.log(upvotes);
        setUpvotes(upvotes)
    }
    // Send comment handler
    const handleSocketUpvote = (upvote : any) => {
        socket?.emit('upvote', upvote)
    }
    //Turn on websocket stream
    useEffect(() => {
        socket?.on('upvote', upvoteListener)
        return () => {
            socket?.off('upvote', upvoteListener)
        }
    }, [upvoteListener])
    return (
        <>
            <div className='m-2'>
                <div className='border-2 p-2 '>
                    {content}
                    {createdAt}
                    {user.name + user.surname}

                    <div>
                        <span> Upvote ⬆️ {}</span>
                        <span> Downvote ⬇️ {}</span>
                        {currentUser && <span className='cursor-pointer' onClick={handleOpenReply}>Reply</span>}
                        {(currentUser && user.id === currentUser.id) && <span className='text-red-600' onClick={()=>{
                            handleSocketComment({
                                method:'delete',
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
                            method:'post',
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