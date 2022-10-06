import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userState} from "../redux/store";
import {Link} from "react-router-dom";
import {logoutUser} from "../redux/user-slice";
import Cookies from "universal-cookie";


interface props {
    config: {
        setLoginOpen: any,
        loginOpen: boolean
    }
}

const UserPanel: React.FC<props> = ({config}) => {
    const {user} = useSelector(userState)
    const dispatch = useDispatch();

    const handleOpenLogin = () => {
        config.setLoginOpen(!config.loginOpen)
    }
    const handleLogout = () =>{
        const cookie = new Cookies;
        cookie.remove('access_token');
        cookie.remove('refresh_token');
        dispatch(logoutUser({}))
    }
    if (!user) return (
        <div>
            <span onClick={handleOpenLogin}>Login {"->"}</span>
        </div>
    )

    return (
        <div>
            <Link to={'/'}>My Articles</Link>
            <Link to={'/'}>Create Article</Link>
            <span onClick={handleLogout}>Logout</span>
        </div>
    );
};

export default UserPanel;