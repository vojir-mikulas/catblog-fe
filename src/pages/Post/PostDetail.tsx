import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {DateTime} from "luxon";
import CommentList from "../../components/comments/CommentList";
import {io, Socket} from "socket.io-client";
import {useSelector} from "react-redux";
import {userState} from "../../redux/store";
import Cookies from "universal-cookie";
import Comment from "../../interfaces/Comment";
import avatar from "../../img/avatar.jpg";
import stripHtmlMarkdown from "../../helpers/stripHtmlMarkdown";
import { motion } from 'framer-motion';

export const CommentContext = React.createContext({});

const PostDetail = () => {
    const {id} = useParams();
    const {user}: any = useSelector(userState)
    const navigate = useNavigate();
    const [socket, setSocket] = useState<Socket>()
    const [comments, setComments] = useState<Array<Comment>>([]);

    const [commentContent, setCommentContent] = useState<string | undefined>()

    const {response: post, loading: postLoading} = useAxios({
        method: 'get',
        url: `/posts/${id}`,
    }, [id])
    const {response: relatedPosts, loading: relatedPostsLoading} = useAxios({
        method: 'get',
        url: '/posts',
    })
    const commentsByParentId = useMemo(() => {
        if (!comments) return [];
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
        const newSocket = io(wsUrl, {
            extraHeaders: {
                Authorization: `Bearer ${access_token}`
            }
        })
        setSocket(newSocket)
    }, [process.env.REACT_APP_COMMENT_WS_URL])
    //Socket listener
    const commentListener = (comment: any) => {
        setComments([...comment])
    }
    // Send comment handler
    const handleSocketComment = (comment: any) => {
        socket?.emit('comment', comment)
    }
    //Turn on websocket stream
    useEffect(() => {
        socket?.on('comment', commentListener)
        return () => {
            socket?.off('comment', commentListener)
        }
    }, [commentListener])

    useEffect(() => {
        setComments(post?.data.comments)
    }, [post?.data.comments])
    if (postLoading || relatedPostsLoading) return <div></div>
    return (
        <motion.div className='md:container mx-auto flex'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}>

            <main className='w-4/6 mobile:w-full '>
                <section>
                    <article >
                        <header  className={'mobile:p-5'}>
                            <h1 className='font-medium text-4xl my-4'>{post?.data.title}</h1>
                            <div className='text-sm text-gray-500 flex gap-4 my-5  '>
                                <span>{`${post?.data.author.name} ${post?.data.author.surname}`}</span>
                                <span>{`${DateTime.fromISO(post?.data.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}`}</span>
                            </div>
                        </header>
                        <img src={`${process.env.REACT_APP_BASEURL}${post?.data.thumbnail}`} alt="thumbnail"
                             className='w-full object-cover object-center mobile:h-50' style={{height: '500px'}}/>
                        <p className={'my-5 markdown mobile:p-5'} dangerouslySetInnerHTML={{__html: post?.data.content}}></p>
                    </article>
                </section>
                <hr className='my-6 '/>
                <section className='pb-20 mobile:px-3'>
                    <h4 className='text-2xl font-medium'>Comments ({comments ? comments.length : 0})</h4>
                    <article className=' mobile:text-xs'>
                        {user && <div className='flex items-center w-full my-6'>

                            <div className='mr-6 rounded-full overflow-hidden w-16 h-16 flex-shrink-0 '>
                                <img
                                    src={user?.avatar ? (process.env.REACT_APP_BASEURL + user.avatar) : avatar}
                                    alt="avatar" className='w-full h-full object-cover '/>
                            </div>

                            <textarea placeholder='Join the discussion' value={commentContent} onChange={(e: any) => {
                                setCommentContent(e.currentTarget.value)
                            }} className='w-full border border-gray-300 rounded h-14 p-2 text-lg' onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSocketComment({
                                        method: 'post',
                                        content: commentContent,
                                        postId: id
                                    })
                                    setCommentContent('');
                                }
                            }}/>

                        </div>}

                        <CommentContext.Provider value={{
                            getComments,
                            handleSocketComment,
                            postId: id,
                        }}>
                            {/*@ts-ignore*/}
                            <CommentList comments={commentsByParentId[null]}/>
                        </CommentContext.Provider>
                    </article>
                </section>
            </main>
            <aside className='w-2/6 mobile:hidden'>
                <div className=' sticky top-20 flex flex-col border-l border-gray-300 px-7 mx-7'>
                    <h2 className='text-2xl font-medium my-6'>Related articles</h2>
                    <div className='flex flex-col'>
                        {relatedPosts?.data.map((post: any) => {
                            if(relatedPosts?.data.id === id) return;
                            return (
                                <div className='my-1 cursor-pointer'
                                     onClick={() => (navigate(`/posts/${post.id}`, {replace: true}))}>
                                    <h4 className='font-medium '>{post.title}</h4>
                                    <p className='text-sm'>{stripHtmlMarkdown(post.content.substring(0, 40))}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </aside>
        </motion.div>
    );
};

export default PostDetail;