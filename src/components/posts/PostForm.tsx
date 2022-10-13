import React, {useEffect, useRef, useState} from 'react';
import InputText from "../forms/InputText";
import PostEditor from "../PostEditor";
import {InputError} from "../../interfaces/InputError";
import {toast} from "react-toastify";
import {Axios} from "../../hooks/useAxios";
import {errorCheck} from "../../helpers/ErrorCheck";
import {useNavigate, useParams} from "react-router-dom";

const PostForm = ({method,post}:any) => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublished, setIsPublished] = useState<boolean>(false)
    const isPublishedInput = useRef<HTMLInputElement>(null);

    const [originalFilename,setOriginalFilename] = useState<string>();
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
    const handleImageChange  = (e: any) =>{
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        let file = e.currentTarget.files[0]
        setSelectedFile(file)
    }

    const handleThumbnailDelete = async () =>{
        if(method === 'edit'){
            const {response,error} = await Axios({
                method:'delete',
                url:`/posts/thumbnail/${id}`
            })
            if(error) return;
        }

        setFilePreview(undefined);
        setSelectedFile(undefined);
        setIsPublished(false);
        if(isPublishedInput && isPublishedInput.current) isPublishedInput.current.checked = false;
    }
    const handleSubmit = async (e : any)=>{
        e.preventDefault();
        if (errorCheck([titleError, contentError])) return;

        if(method === 'edit'){
            const file = {
                filename: originalFilename ? originalFilename : undefined,
                thumbnail: selectedFile ? selectedFile : undefined,
            }
            const {response,error} = await Axios({
                method:'put',
                url:`/posts/${id}`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data:{
                    title,
                    content,
                    isPublished,
                    ...file
                }
            },)

            if(response?.status === 200)toast.success('Post was successfully updated! 😊')
            if(error) return;
        }
        if(method === 'create'){
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
            if(response?.status === 201)toast.success('Post was successfully created! 😊')
            if(error) return;

        }

        navigate('/user/posts')
    }
    useEffect(() => {
        if (!selectedFile) return

        const objectUrl = URL.createObjectURL(selectedFile)
        setFilePreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    useEffect(()=>{
        if(post){
            setTitle(post?.data.title);
            setContent(post?.data.content);
            if(post?.data.thumbnail) setFilePreview(process.env.REACT_APP_BASEURL + post?.data.thumbnail);
            if(post?.data.thumbnail) setOriginalFilename(post?.data.thumbnail.split('/').slice(-1)[0]);
            setIsPublished(post?.data.isPublished);
        }
    },[post])
    useEffect(()=>{
        if(content === '' || !content){

            setContentError({
                ErrorMessage: 'Content cannot be null. '
            })
        } else {
            setContentError(null)
        }
    },[content])


    return (
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
                setContent,
                initialValue: `${post ? post?.data.content : ''}`
            }}/>
            <label htmlFor="">
                Is published
                <input ref={isPublishedInput} type="checkbox" onInput={handleCheckboxChange} name="isPublished" id="isPublished" defaultChecked={post?.data.isPublished}/>
            </label>
            <button onClick={handleSubmit}>{method === 'create' ? 'create' : 'edit'}</button>
        </form>
    );
};

export default PostForm;