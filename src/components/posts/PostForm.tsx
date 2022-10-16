import React, {useEffect, useRef, useState} from 'react';
import InputText from "../forms/InputText";
import PostEditor from "../forms/PostEditor";
import {InputError} from "../../interfaces/InputError";
import {toast} from "react-toastify";
import {Axios} from "../../hooks/useAxios";
import {errorCheck} from "../../helpers/ErrorCheck";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../forms/Button";

interface props {
    config: {
        method: string,
        post?: any,
        heading: string,
    }
}

const PostForm: React.FC<props> = ({config}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {method, post, heading} = config;
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isPublished, setIsPublished] = useState<boolean>(false)
    const isPublishedInput = useRef<HTMLInputElement>(null);

    const [originalFilename, setOriginalFilename] = useState<string>();
    const [filePreview, setFilePreview] = useState<any>();
    const [selectedFile, setSelectedFile] = useState<any>();

    const [titleError, setTitleError] = useState<InputError | null>(null);
    const [contentError, setContentError] = useState<InputError | null>(null);


    const handleCheckboxChange = (e: any) => {
        if (!filePreview) {
            toast.warn('Post must have image before publishing! 😉')
            e.currentTarget.checked = false;
            return setIsPublished(false)
        }
        setIsPublished(e.currentTarget.checked)

    }
    const handleImageChange = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        let file = e.currentTarget.files[0]
        setSelectedFile(file)
    }

    const handleThumbnailDelete = async () => {
        if (method === 'edit') {
            const {response, error} = await Axios({
                method: 'delete',
                url: `/posts/thumbnail/${id}`
            })
            if (error) return;
        }

        setFilePreview(undefined);
        setSelectedFile(undefined);
        setIsPublished(false);
        if (isPublishedInput && isPublishedInput.current) isPublishedInput.current.checked = false;
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (errorCheck([titleError, contentError])) return;

        if (method === 'edit') {
            const file = {
                filename: originalFilename ? originalFilename : undefined,
                thumbnail: selectedFile ? selectedFile : undefined,
            }
            const {response, error} = await Axios({
                method: 'put',
                url: `/posts/${id}`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    title,
                    content,
                    isPublished,
                    ...file
                }
            },)

            if (response?.status === 200) toast.success('Post was successfully updated! 😊')
            if (error) return;
        }
        if (method === 'create') {
            const {response, error} = await Axios({
                method: 'post',
                url: '/posts',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    title,
                    content,
                    isPublished,
                    thumbnail: selectedFile
                }
            },)
            if (response?.status === 201) toast.success('Post was successfully created! 😊')
            if (error) return;

        }

        navigate('/user/posts')
    }
    useEffect(() => {
        if (!selectedFile) return

        const objectUrl = URL.createObjectURL(selectedFile)
        setFilePreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    useEffect(() => {
        if (post) {
            setTitle(post?.data.title);
            setContent(post?.data.content);
            if (post?.data.thumbnail) setFilePreview(process.env.REACT_APP_BASEURL + post?.data.thumbnail);
            if (post?.data.thumbnail) setOriginalFilename(post?.data.thumbnail.split('/').slice(-1)[0]);
            setIsPublished(post?.data.isPublished);
        }
    }, [post])
    useEffect(() => {
        if (content === '' || !content) {

            setContentError({
                ErrorMessage: 'Content cannot be null. '
            })
        } else {
            setContentError(null)
        }
    }, [content])


    return (
        <div className='md:container mx-auto'>
            <div className='w-4/6 mobile:w-full'>
                <div className='flex gap-6 mt-10 mb-5 flex items-center mobile:flex-col mobile:items-center '>
                    <h1 className='text-4xl font-medium'>{heading}</h1>
                    <Button config={{
                        onClickHandler: handleSubmit,
                        title: method === 'create' ? 'Create post' : 'Save post'
                    }}/>
                    <label htmlFor="isPublished" className='flex gap-2'>
                        <input ref={isPublishedInput} type="checkbox" onInput={handleCheckboxChange} name="isPublished"
                               id="isPublished" defaultChecked={post?.data.isPublished}/>
                        Publish
                    </label>
                </div>
                <form method='POST' encType="multipart/form-data" className='mobile:flex mobile:flex-col mobile:items-center mobile:text-center' onSubmit={(e) => (e.preventDefault())}>
                    <div className='w-1/2'>
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
                    </div>

                    <div className='flex flex-col gap-2 mb-8'>
                        <span className='font-medium my-1'>Featured image</span>
                        <input onChange={handleImageChange} type="file"
                               id="thumbnail" name="thumbnail"
                               accept="image/png, image/jpeg" className='hidden'/>
                        <label htmlFor="thumbnail">
                            {!filePreview && <span
                                className={`text-white bg-gray-500 px-2 py-3 rounded transition-transform font-medium cursor-pointer`}>Upload an image</span>}
                        </label>
                        {filePreview && <div  className='w-52 h-32'><img src={filePreview} alt="thumbnail"  className='w-full h-full object-cover' /></div>}
                        {filePreview && <div className='flex gap-2 my-3'>
                            <label htmlFor="thumbnail">  <span className='text-blue-500 cursor-pointer'>Upload new</span></label>
                            <span className='border-r border-gray-400'></span>
                            <span onClick={handleThumbnailDelete} className='text-red-400 cursor-pointer'>Delete</span>
                        </div>}

                    </div>
                    <PostEditor config={{
                        setContent,
                        initialValue: `${post ? post?.data.content : ''}`,
                        error:contentError
                    }}/>
                </form>
            </div>
        </div>
    );
};

export default PostForm;