import React, {useEffect, useState} from 'react';
import useProtectedRoute from "../hooks/useProtectedRoute";
import useAxios, {Axios} from "../hooks/useAxios";
import Post from "../interfaces/Post";
import {useNavigate} from "react-router-dom";
import useTableSort, {UseTableSortByAuthor, UseTableSortByComments} from "../hooks/useTableSort";

const UserPosts = () => {
    useProtectedRoute();
    const navigate = useNavigate();
    const [posts,setPosts] = useState<Array<Post>>([])
    const {response, loading: loadingPosts} = useAxios({
        method: 'get',
        url: '/users/posts',
    })

    useEffect(()=>{
    setPosts(response?.data)
    },[response])

    const handlePostDelete = async (id:string)=>{

        const {response} = await Axios({
            method:'DELETE',
            url:`/posts/${id}`
        },()=>{
            let arr = posts;
            let postIndex = arr.findIndex((post:Post)=>(post.id === id));
            arr.splice(postIndex, 1);
            setPosts([...arr]);
        })
    }

    const handleTitleSort = useTableSort(posts,setPosts,'title')
    const handleContentSort = useTableSort(posts,setPosts,'content')
    const handleAuthorSort = UseTableSortByAuthor(posts,setPosts)
    const handleCommentSort = UseTableSortByComments(posts,setPosts)

    const handlePostEdit = (id:string) =>{
        navigate(`/user/posts/${id}`,{replace:true})
    }

    if(loadingPosts) return <div></div>
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th onClick={handleTitleSort}>Article title</th>
                    <th onClick={handleContentSort}>Content</th>
                    <th onClick={handleAuthorSort}>Author</th>
                    <th onClick={handleCommentSort}># of comments</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {posts?.map((post: Post) => {

                    return (
                        <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.content.substring(0,80)}</td>
                            <td>{`${post.author?.name} ${post.author?.surname}`}</td>
                            <td>{post.comments?.length}</td>
                            <td><span onClick={()=>(handlePostEdit(`${post.id}`))}>Edit</span> <span onClick={()=>(handlePostDelete(`${post.id}`))}>Delete</span></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
};

export default UserPosts;