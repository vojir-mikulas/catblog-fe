import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import InputText from "../../components/forms/InputText";
import {InputError} from "../../interfaces/InputError";
import useAxios, {Axios} from "../../hooks/useAxios";
import {toast} from "react-toastify";
import PostEditor from "../../components/PostEditor";
import {errorCheck} from "../../helpers/ErrorCheck";
import PostForm from "../../components/posts/PostForm";
import { motion } from 'framer-motion';


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
        <motion.div   initial={{opacity:0}}
                      animate={{opacity:1}}
                      exit={{opacity:0}}>
            <PostForm config={{
                method: 'edit',
                heading: 'Edit post',
                post: post,
            }}/>
        </motion.div>
    );
};

export default PostEdit;