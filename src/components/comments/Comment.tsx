import React, {useContext, useState} from 'react';
import {CommentContext} from "../../pages/Post/PostDetail";
import {useSelector} from "react-redux";
import {userState} from "../../redux/store";
import {DateTime} from 'luxon';
import avatar from '../../img/avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp,faArrowDown  } from '@fortawesome/free-solid-svg-icons'
import ReplyCommentList from "./ReplyCommentList";

enum Values {
    UPVOTE = 1,
    DOWNVOTE = -1
}

const Comment = ({id, content, createdAt, user, upvotes,parentId}: any) => {
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
            <div className='relative'>
                {parentId && <div className='border-l-2 border-b-2  h-10 w-6 border-gray-300 rounded-bl-xl absolute -left-8 top-1'></div>}
                <div className='my-2 py-2 flex flex-col'>

                    <div className='flex w-full'>
                        <div className='mr-6 rounded-full overflow-hidden w-16 h-16 flex-shrink-0 '>
                            <img
                                src={user?.avatar ? (process.env.REACT_APP_BASEURL + user.avatar) : avatar}
                                alt="avatar" className='w-20 h-20 object-cover rounded-full'/>
                        </div>
                        <div className='flex flex-col'>
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <span className='font-medium'>{user.name + ' ' + user.surname}</span>
                                    <span
                                        className='text-sm text-gray-500'>{DateTime.fromISO(createdAt).setLocale('en').toRelativeCalendar()}</span>
                                </div>
                                <p> {content}</p>
                            </div>

                            <div className='flex gap-4'>
                                <div className='flex gap-4'>
                                    <span className='font-medium w-3'> {`${upvotes > 0 ? '+' : ''}${upvotes}`} </span>
                                    <span className={'cursor-pointer'} onClick={() => {
                                        handleUpvote(Values.UPVOTE)
                                    }}> <FontAwesomeIcon icon={faArrowUp}/> </span>
                                    <span className={'cursor-pointer'} onClick={() => {
                                        handleUpvote(Values.DOWNVOTE)
                                    }}> <FontAwesomeIcon icon={faArrowDown}/> </span>

                                </div>
                                {currentUser && <span className='cursor-pointer' onClick={handleOpenReply}>Reply</span>}
                                {(currentUser && user.id === currentUser.id) &&
                                    <span   className='text-red-600 cursor-pointer' onClick={() => {
                                        handleSocketComment({
                                            method: 'delete',
                                            id,
                                            postId
                                        })
                                    }}> Delete </span>}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div className='pl-16 flex flex-col relative '>
                <div className={`border-l-2 border-gray-300  absolute h-[calc(100%_-_4.3rem)] left-8`}></div>
                <ReplyCommentList comments={getComments(id)}/>
            </div>
            {openedReply && <div className='flex items-center w-full my-6'>
                <div className='mr-6 rounded-full overflow-hidden w-16 h-16 flex-shrink-0 '>
                    <img
                        src={user?.avatar ?(process.env.REACT_APP_BASEURL + user.avatar) : avatar}
                        alt="avatar" className='w-full h-full object-cover ' />
                </div>

                <textarea placeholder='Reply' value={replyContent} onChange={(e: any) => {
                    setReplyContent(e.currentTarget.value)
                }} className='w-full border border-gray-300 rounded h-14 p-2 text-lg'
                          onKeyDown={(e)=>{
                              if(e.key === 'Enter') {
                                  handleSocketComment({
                                      method: 'post',
                                      content: replyContent,
                                      postId,
                                      parentId: id
                                  })
                                  setOpenedReply(false)
                                  setReplyContent('');
                              }
                          }
                          }></textarea>

            </div>}
        </>
    );
};

export default Comment;