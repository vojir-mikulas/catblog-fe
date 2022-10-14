
import {useDispatch, useSelector} from "react-redux";
import {userState} from "../redux/store";
import {Link, useNavigate} from "react-router-dom";
import {useLogoutUser} from "../hooks/service/authService";
import React, {useState} from "react";
import avatar from "../img/avatar.jpg";
import {User} from "../interfaces/User";
import Button from "./Button";


const UserPanel: React.FC = () => {
    const {user}: any = useSelector(userState)


    const navigate = useNavigate();
    const handleNavigateToLogin = ()=>{
        navigate('/auth/login')
    }
    const handleLogout = useLogoutUser();
    if (!user) return (
        <div className='flex items-center'>
            <span onClick={handleNavigateToLogin} className='cursor-pointer text-blue-600'>Login {"->"}</span>
        </div>
    )

    return (
        <>
            <div className='flex items-center gap-3'>
                <Link to={'/user/posts'} className='hover:text-blue-600 transition-colors'>My Articles</Link>
                <Link to={'/user/posts/create'} className='hover:text-blue-600 transition-colors'>Create Article</Link>
                <Link to={'/user/profile'} className='hover:text-blue-600 transition-colors'>My profile</Link>

                <span className='hover:text-blue-600 transition-colors cursor-pointer' onClick={handleLogout}> Log Out </span>
                <img
                    src={user?.avatar ?(process.env.REACT_APP_BASEURL + user.avatar) : avatar}
                    alt="avatar" className='w-10 h-10 object-cover rounded-full cursor-pointer' onClick={()=>(navigate('/user/profile'))}/>

            </div>

        </>
    );
};







export default UserPanel;