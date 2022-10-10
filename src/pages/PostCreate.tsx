import React, {useEffect, useState} from 'react';
import InputText from "../components/forms/InputText";
import {InputError} from "../interfaces/InputError";
import {Axios} from "../hooks/useAxios";
import {useSelector} from "react-redux";
import {userState} from "../redux/store";
import {useNavigate} from "react-router-dom";
import useProtectedRoute from "../hooks/useProtectedRoute";
import {toast} from "react-toastify";


const PostCreate = () => {
    useProtectedRoute();
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublished, setIsPublished] = useState<boolean>()

    const [filePreview,setFilePreview] = useState<any>();
    const [selectedFile,setSelectedFile] = useState<any>();

    const [titleError, setTitleError] = useState<InputError | null>(null);
    const [contentError, setContentError] = useState<InputError | null>(null);

    const handleCheckboxChange = (e: any)=>{
        setIsPublished(e.currentTarget.checked)
    }
    const handleSubmit = async (e: any) =>{
        e.preventDefault();

        const {response} = await Axios({
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

    useEffect(() => {
        if (!selectedFile) return

        const objectUrl = URL.createObjectURL(selectedFile)
        setFilePreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

 
    return (
        <div>
            <h1>Create post</h1>
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
                           accept="image/png, image/jpeg" />
                    <img src={filePreview} alt="thumbnail" style={{width:"100px",height:"100px"}} />
                </label>
                <label htmlFor="">
                    Content
                    <textarea onInput={(e:any)=>{
                        setContent(e.currentTarget.value)
                    }} name="" id="">

                    </textarea>
                </label>

                <label htmlFor="">
                    Is published
                    <input type="checkbox" onInput={handleCheckboxChange} name="isPublished" id="isPublished" />
                </label>
                <button onClick={handleSubmit}>Create</button>
            </form>
        </div>
    );
};

export default PostCreate;