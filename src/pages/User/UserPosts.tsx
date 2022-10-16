import React, {useEffect, useState} from 'react';
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useAxios, {Axios} from "../../hooks/useAxios";
import Post from "../../interfaces/Post";
import {useNavigate} from "react-router-dom";
import useTableSort, {UseTableSortByAuthor, UseTableSortByComments} from "../../hooks/useTableSort";
import stripHtml from "../../helpers/stripHtmlMarkdown";
import {toast} from "react-toastify";
import {motion} from 'framer-motion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSort, faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import Button from "../../components/forms/Button";

const UserPosts = () => {
    useProtectedRoute();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Array<Post>>([])
    const {response, loading: loadingPosts} = useAxios({
        method: 'get',
        url: '/users/posts',
    })

    useEffect(() => {
        setPosts(response?.data)
    }, [response])

    const handlePostDelete = async (id: string) => {
        const {error} = await Axios({
            method: 'DELETE',
            url: `/posts/${id}`
        }, () => {
            let arr = posts;
            let postIndex = arr.findIndex((post: Post) => (post.id === id));
            arr.splice(postIndex, 1);
            setPosts([...arr]);
        })
        if (error) return;
        toast.success('Post was sucessfully deleted. 😮‍💨')
    }

    const handleTitleSort = useTableSort(posts, setPosts, 'title')
    const handleContentSort = useTableSort(posts, setPosts, 'content')
    const handleAuthorSort = UseTableSortByAuthor(posts, setPosts)
    const handleCommentSort = UseTableSortByComments(posts, setPosts)

    const handlePostEdit = (id: string) => {
        navigate(`/user/posts/${id}`, {replace: true})
    }

    if (loadingPosts) return <div></div>
    return (
        <motion.div initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className='md:container mx-auto'>
            <div className='flex gap-6 mt-10 mb-5 mobile:flex-col mobile:items-center'>
                <h1 className='text-4xl font-medium'>My articles</h1>
                <Button config={{
                    title: 'Create new post',
                    onClickHandler: () => {
                        navigate('/user/posts/create')
                    }
                }}/>
            </div>
            <table className='w-full table-auto mobile:text-xs'>
                <thead className='border-b-2 border-gray-300 text-left h-10 '>
                <tr >
                    <th onClick={handleTitleSort} className='cursor-pointer'>Article title <FontAwesomeIcon
                        icon={faSort}/></th>
                    <th onClick={handleContentSort} className='cursor-pointer'>Content <FontAwesomeIcon icon={faSort}/>
                    </th>
                    <th onClick={handleAuthorSort} className='cursor-pointer'>Author <FontAwesomeIcon icon={faSort}/>
                    </th>
                    <th onClick={handleCommentSort} className='cursor-pointer'># of comments <FontAwesomeIcon
                        icon={faSort}/></th>
                    <th>Actions</th>
                </tr>
                </thead>
                <motion.tbody >
                {posts?.map((post: Post) => {

                    return (
                        <tr key={post.id} className='border-b border-gray-300 h-14 '>
                            <td>{post.title}</td>
                            <td>{stripHtml(post.content.substring(0, 80))}...</td>
                            <td>{`${post.author?.name} ${post.author?.surname}`}</td>
                            <td>{post._count?.comments}</td>
                            <td className='flex text-xl h-14 items-center justify-around'><span className='cursor-pointer hover:text-blue-500 transition-colors'
                                      onClick={() => (handlePostEdit(`${post.id}`))}> <FontAwesomeIcon
                                icon={faPen}/> </span> <span
                                className='cursor-pointer hover:text-red-400 transition-colors'
                                onClick={() => (handlePostDelete(`${post.id}`))}><FontAwesomeIcon
                                icon={faTrash}/></span></td>
                        </tr>
                    )
                })}
                </motion.tbody>
            </table>
        </motion.div>
    );
};

export default UserPosts;