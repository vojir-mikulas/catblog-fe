import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import InputText from "../../components/forms/InputText";
import {InputError} from "../../interfaces/InputError";
import useAxios, {Axios} from "../../hooks/useAxios";
import {toast} from "react-toastify";
import PostEditor from "../../components/PostEditor";
import {errorCheck} from "../../helpers/ErrorCheck";
import PostForm from "../../components/posts/PostForm";


const PostEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const {response:post,error:postError,loading:postLoading} = useAxios({
        method:'get',
        url:`/users/posts/${id}`
    })

    if(postError) navigate('/user/posts')
    if(postLoading) return <div></div>
    return (
        <div>
            <h1>Edit post</h1>
            <PostForm method={'edit'} post={post}/>
        </div>
    );
};

export default PostEdit;