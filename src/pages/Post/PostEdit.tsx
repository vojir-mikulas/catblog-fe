import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import InputText from "../../components/forms/InputText";
import {InputError} from "../../interfaces/InputError";
import useAxios, {Axios} from "../../hooks/useAxios";
import {toast} from "react-toastify";
import PostEditor from "../../components/PostEditor";
import {errorCheck} from "../../helpers/ErrorCheck";


const PostEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublished, setIsPublished] = useState<boolean>();
    const isPublishedInput = useRef<HTMLInputElement>(null);

    const [originalFilename,setOriginalFilename] = useState<string>();
    const [filePreview,setFilePreview] = useState<any>();
    const [selectedFile,setSelectedFile] = useState<any>();


    const [titleError, setTitleError] = useState<InputError | null>(null);
    const [contentError, setContentError] = useState<InputError | null>(null);

    const {response:post,error:postError,loading:postLoading} = useAxios({
        method:'get',
        url:`/users/posts/${id}`
    })
    const handleSubmit = async (e : any)=>{
        e.preventDefault();
        if (errorCheck([titleError, contentError])) return;
        const file = {
            filename: originalFilename ? originalFilename : undefined,
            thumbnail: selectedFile ? selectedFile : undefined,
        }

        const {response} = await Axios({
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
        navigate('/user/posts')
    }
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
        const {response,error} = await Axios({
            method:'delete',
            url:`/posts/thumbnail/${id}`
        })
        if(error) return;

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
        setTitle(post?.data.title);
        setContent(post?.data.content);
        if(post?.data.thumbnail) setFilePreview(process.env.REACT_APP_BASEURL + post?.data.thumbnail);
        if(post?.data.thumbnail) setOriginalFilename(post?.data.thumbnail.split('/').slice(-1)[0]);
        setIsPublished(post?.data.isPublished);
    },[post])


    if(postError) navigate('/user/posts')
    if(postLoading) return <div></div>
    return (
        <div>
            <h1>Edit post</h1>
            <form method='POST' encType="multipart/form-data">
                <InputText config={{
                    name: 'Title',
                    placeholder: 'Post title..',
                    setValue: setTitle,
                    value: title,

                    setError: setTitleError,
                    error: titleError,
                    errorMessage: 'Title is invalid'
                }}/>
                <label htmlFor="">
                    <input onChange={handleImageChange} type="file"
                           id="thumbnail" name="thumbnail"
                           accept="image/png, image/jpeg"/>
                    <img src={filePreview} alt="thumbnail" style={{width:"100px",height:"100px"}} />
                    {filePreview && <span onClick={handleThumbnailDelete}>Delete</span>}
                </label>
                <label htmlFor="content">
                    Content
                    <PostEditor config={{
                        setContent,
                        initialValue: `${post?.data.content}`
                    }}/>
                </label>

                <label htmlFor="">
                    Is published
                    <input ref={isPublishedInput} type="checkbox" onInput={handleCheckboxChange} name="isPublished" id="isPublished" defaultChecked={post?.data.isPublished} />
                </label>
                <button onClick={handleSubmit}>Save</button>
            </form>
        </div>
    );
};

export default PostEdit;