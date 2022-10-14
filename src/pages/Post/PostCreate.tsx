import React, {useEffect, useRef, useState} from 'react';
import InputText from "../../components/forms/InputText";
import {InputError} from "../../interfaces/InputError";
import {Axios} from "../../hooks/useAxios";
import {useNavigate} from "react-router-dom";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import {toast} from "react-toastify";
import PostEditor from "../../components/PostEditor";
import {errorCheck} from "../../helpers/ErrorCheck";
import PostForm from "../../components/posts/PostForm";
import { motion } from 'framer-motion';



const PostCreate = () => {
    useProtectedRoute();

    return (
        <motion.div   initial={{opacity:0}}
                      animate={{opacity:1}}
                      exit={{opacity:0}}>

            <PostForm config={{
                heading: 'Create new article',
                method: 'create'
            }}/>
        </motion.div>
    );
};

export default PostCreate;