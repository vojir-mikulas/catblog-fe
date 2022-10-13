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



const PostCreate = () => {
    useProtectedRoute();

    return (
        <div>
            <PostForm method={'create'} />
        </div>
    );
};

export default PostCreate;