import React, {useEffect, useState} from 'react';
import useAxios, {Axios} from "../../hooks/useAxios";
import avatar from '../../img/avatar.jpg'
import useProtectedRoute from "../../hooks/useProtectedRoute";
import InputTextEdit from "../../components/InputTextEdit";
import {toast} from "react-toastify";

const UserProfile = () => {
    useProtectedRoute();
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string >('');

    const [filePreview,setFilePreview] = useState<any>();
    const [selectedFile,setSelectedFile] = useState<any>();

    const {response: userResponse, error, loading} = useAxios({
        method: 'get',
        url: '/users/me',

    });


    const handleImageChange  = (e: any) =>{
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        let file = e.currentTarget.files[0]
        setSelectedFile(file)
    }
    const handleImageDelete = async () =>{
        const {error} = await Axios({
            method:'delete',
            url:`/users/avatar`
        })
        if(error) return;
        setFilePreview(null);
        setSelectedFile(null);
        toast.success('Avatar successfully deleted. 😶‍🌫️')
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
        if(selectedFile) {
            const {response, error} = await Axios({
                method:'post',
                url:'/users/avatar',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data:{
                    avatar:selectedFile
                }
            })

            if(error) return;
        }
        if(error) return;

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
        if(userResponse?.data.avatar) setFilePreview(process.env.REACT_APP_BASEURL + userResponse?.data.avatar);
    }, [userResponse])
    if (loading) return <div></div>
    return (
        <div>
            <section>
                <h1>Profile</h1>
                <div>
                    <label htmlFor="">
                        <input onChange={handleImageChange} type="file"
                               id="thumbnail" name="thumbnail"
                               accept="image/png, image/jpeg" />
                        <img
                            src={filePreview ? filePreview : avatar}
                            alt="avatar"/>
                        {filePreview && <span onClick={handleImageDelete}>Delete avatar</span>}
                    </label>
                    <InputTextEdit config={{
                        value: name,
                        setValue: setName
                    }}/>
                    <InputTextEdit config={{
                        value: surname,
                        setValue: setSurname
                    }}/>

                    <button onClick={handleSubmit}>Save</button>
                </div>
            </section>

        </div>
    );
};

export default UserProfile;