import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {DateTime} from "luxon";
import CommentList from "../../components/comments/CommentList";
import {io, Socket} from "socket.io-client";
import {useSelector} from "react-redux";
import {userState} from "../../redux/store";
import Cookies from "universal-cookie";
import Comment from "../../interfaces/Comment";

export const CommentContext = React.createContext({});

const PostDetail = () => {
    const {id} = useParams();
    const {user} = useSelector(userState)

    const [socket, setSocket] = useState<Socket>()
    const [comments, setComments] = useState<Array<Comment>>([])

    const [commentContent, setCommentContent] = useState<string |undefined>()

    const {response: post, loading: postLoading} = useAxios({
        method: 'get',
        url: `/posts/${id}`,
    })

    const commentsByParentId = useMemo(() => {
        if(!comments) return [];
        let group: any = {};
        //TODO create comment interface
        comments.forEach((comment: any) => {
            group[comment.parentId] ||= [];
            group[comment.parentId].push(comment)
        })
        return group;
    }, [comments])
    const getComments = (parentId: any) => {
        return commentsByParentId[parentId];
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
    const commentListener = (comment: any) => {
        console.log(comment);
        setComments([...comment])
    }
    // Send comment handler
    const handleSocketComment = (comment : any) => {
        socket?.emit('comment', comment)
    }
    //Turn on websocket stream
    useEffect(() => {
        socket?.on('comment', commentListener)
        return () => {
            socket?.off('comment', commentListener)
        }
    }, [commentListener])

    useEffect(()=>{
        setComments(post?.data.comments)
    },[post?.data.comments])
    if (postLoading) return <div></div>
    return (
        <div>
            <aside>
                <h2>Related articles</h2>

            </aside>
            <section>
                <article>
                    <header>
                        <h1>{post?.data.title}</h1>
                        <span>{`${post?.data.author.name} ${post?.data.author.surname}`}</span>
                        <span>{`${DateTime.fromISO(post?.data.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}`}</span>
                    </header>
                    <img src={`${process.env.REACT_APP_BASEURL}${post?.data.thumbnail}`} alt="thumbnail"/>
                    <p dangerouslySetInnerHTML={{__html: post?.data.content}}></p>
                </article>
            </section>
            <section>
                <h1>Comments</h1>
                <article>
                    {user && <div>
                        <input type="text" value={commentContent} onChange={(e: any) => {
                            setCommentContent(e.currentTarget.value)
                        }
                        }/>
                        <button onClick={()=> {
                            handleSocketComment({
                                method:'post',
                                content: commentContent,
                                postId: id
                            })
                        }}> Send</button>
                    </div>}

                    <CommentContext.Provider value={{
                        getComments,
                        handleSocketComment,
                        postId:id,
                    }}>
                        {/*@ts-ignore*/}
                        <CommentList comments={commentsByParentId[null]}/>
                    </CommentContext.Provider>
                </article>
            </section>
        </div>
    );
};

export default PostDetail;