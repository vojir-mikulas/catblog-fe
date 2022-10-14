import React, {useEffect, useState} from 'react';
import useAxios, {Axios} from "../../hooks/useAxios";
import avatar from '../../img/avatar.jpg'
import useProtectedRoute from "../../hooks/useProtectedRoute";
import InputTextEdit from "../../components/InputTextEdit";
import {toast} from "react-toastify";
import {motion} from 'framer-motion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPen, faXmark} from '@fortawesome/free-solid-svg-icons'
import Button from "../../components/Button";

const UserProfile = () => {
    useProtectedRoute();
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');

    const [filePreview, setFilePreview] = useState<any>();
    const [selectedFile, setSelectedFile] = useState<any>();

    const {response: userResponse, error, loading} = useAxios({
        method: 'get',
        url: '/users/me',

    });
    const handleImageChange = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        let file = e.currentTarget.files[0]
        setSelectedFile(file)
    }
    const handleImageDelete = async () => {
        const {error} = await Axios({
            method: 'delete',
            url: `/users/avatar`
        })
        if (error) return;
        setFilePreview(null);
        setSelectedFile(null);

    }
    const handleSubmit = async () => {
        const {response: userUpdateResponse, error} = await Axios({
            method: 'put',
            url: '/users',
            data: {
                name,
                surname
            }
        })
        if (selectedFile) {
            const {response, error} = await Axios({
                method: 'post',
                url: '/users/avatar',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    avatar: selectedFile
                }
            })

            if (error) return;
        }
        if (error) return;

        toast.success('Credentials successfully updated! 🥳')
    }
    useEffect(() => {
        if (!selectedFile) return

        const objectUrl = URL.createObjectURL(selectedFile)
        setFilePreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    useEffect(() => {
        setName(userResponse?.data.name);
        setSurname(userResponse?.data.surname);
        if (userResponse?.data.avatar) setFilePreview(process.env.REACT_APP_BASEURL + userResponse?.data.avatar);
    }, [userResponse])
    if (loading) return <div></div>
    return (
        <motion.div initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className='md:container mx-auto'>
            <section>
                <div className='flex gap-5 mt-10 mb-16'>
                    <h1 className='text-4xl font-medium '>Profile</h1>
                    <Button config={{
                    onClickHandler: handleSubmit,
                    title: 'Save'
                }}/>
                </div>
                <form onSubmit={(e)=>(e.preventDefault())} className='flex gap-10'>
                    <div className='relative w-60 h-60'>
                        <label htmlFor="thumbnail">
                            <input onChange={handleImageChange} type="file"
                                   id="thumbnail" name="thumbnail"
                                   accept="image/png, image/jpeg" className='hidden'/>
                            <img
                                src={filePreview ? filePreview : avatar}
                                alt="avatar"
                                className='cursor-pointer object-cover w-full h-full  rounded-full shadow-lg'/>
                        </label>
                        {filePreview &&
                            <div onClick={handleImageDelete}
                                 className='rounded-full  bg-red-400 text-white w-10 h-10 text-2xl cursour cursor-pointer flex items-center justify-center absolute top-3 right-5'>
                                <FontAwesomeIcon icon={faXmark}/>
                            </div>
                        }
                    </div>
                    <div className='flex flex-col gap-3 text-xl border-l border-gray-300 pl-10'>
                        <label htmlFor="name">
                            Name:
                            <InputTextEdit config={{
                                name:'name',
                                value: name,
                                setValue: setName
                            }}/>
                            <FontAwesomeIcon icon={faPen}/>
                        </label>
                        <label htmlFor="surname">
                            Surname:
                            <InputTextEdit config={{
                                name:'surname',
                                value: surname,
                                setValue: setSurname
                            }}/>
                            <FontAwesomeIcon icon={faPen}/>
                        </label>
                    </div>
                </form>
            </section>

        </motion.div>
    );
};

export default UserProfile;