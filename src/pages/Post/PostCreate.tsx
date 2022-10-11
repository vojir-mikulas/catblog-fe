import React, {useEffect, useRef, useState} from 'react';
import InputText from "../../components/forms/InputText";
import {InputError} from "../../interfaces/InputError";
import {Axios} from "../../hooks/useAxios";
import {useNavigate} from "react-router-dom";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import {toast} from "react-toastify";
import PostEditor from "../../components/PostEditor";
import {errorCheck} from "../../helpers/ErrorCheck";



const PostCreate = () => {
    useProtectedRoute();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublished, setIsPublished] = useState<boolean>(false)
    const isPublishedInput = useRef<HTMLInputElement>(null);

    const [filePreview,setFilePreview] = useState<any>();
    const [selectedFile,setSelectedFile] = useState<any>();

    const [titleError, setTitleError] = useState<InputError | null>(null);
    const [contentError, setContentError] = useState<InputError | null>(null);



    const handleCheckboxChange = (e: any)=>{
        if(!filePreview) {
            toast.warn('Post must have image before publishing! 😉')
            e.currentTarget.checked = false;
            return setIsPublished(false)
        }
        setIsPublished(e.currentTarget.checked)

    }
    const handleSubmit = async (e: any) =>{
        e.preventDefault();
        if (errorCheck([titleError, contentError])) return;

        const {response,error} = await Axios({
            method:'post',
            url:'/posts',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data:{
                title,
                content,
                isPublished,
                thumbnail:selectedFile
            }
        },)
        if(error) return
        toast.success('Post was successfully created. 👍')
        navigate('/user/posts')
    }
    const handleImageChange  = (e: any) =>{
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        let file = e.currentTarget.files[0]
        setSelectedFile(file)
    }
    const handleThumbnailDelete = async () =>{

        setFilePreview(undefined);
        setSelectedFile(undefined);
        setIsPublished(false);
        if(isPublishedInput && isPublishedInput.current) isPublishedInput.current.checked = false;
    }
    useEffect(() => {
        if (!selectedFile) return

        const objectUrl = URL.createObjectURL(selectedFile)
        setFilePreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    useEffect(()=>{
        if(content === '' || !content){
            setContentError({
                ErrorMessage: 'Content cannot be null. '
            })
        }
    },[content])

    return (
        <div>
            <h1>Create post</h1>
            <form method='POST' encType="multipart/form-data">
                <InputText config={{
                    name: 'Title',
                    placeholder: 'Post title..',
                    setValue: setTitle,
                    value: title,
                    regex: /^(?!\s*$).+/,
                    setError: setTitleError,
                    error: titleError,
                    errorMessage: 'Title cannot be null'
                }}/>
                <label htmlFor="">
                    <input onChange={handleImageChange} type="file"
                           id="thumbnail" name="thumbnail"
                           accept="image/png, image/jpeg" />
                    <img src={filePreview} alt="thumbnail" style={{width:"100px",height:"100px"}} />
                    {filePreview && <span onClick={handleThumbnailDelete}>Delete</span>}
                </label>
                 <PostEditor config={{
                     setContent
                 }}/>
                <label htmlFor="">
                    Is published
                    <input ref={isPublishedInput} type="checkbox" onInput={handleCheckboxChange} name="isPublished" id="isPublished" />
                </label>
                <button onClick={handleSubmit}>Create</button>
            </form>
        </div>
    );
};

export default PostCreate;