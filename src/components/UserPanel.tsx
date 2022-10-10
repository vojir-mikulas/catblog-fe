import React, {useContext, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userState} from "../redux/store";
import {Link} from "react-router-dom";
import {logoutUser} from "../redux/user-slice";
import Cookies from "universal-cookie";
import {useLogoutUser} from "../hooks/service/authService";


interface props {
    config: {
        handleOpenLogin: () => void
    }
}

const UserPanel: React.FC<props> = ({config}) => {
    const {user} = useSelector(userState)
    const dispatch = useDispatch();


    const handleLogout = useLogoutUser();
    if (!user) return (
        <div>
            <span onClick={config.handleOpenLogin}>Login {"->"}</span>
        </div>
    )

    return (
        <div>
            <Link to={'/user/posts'}>My Articles</Link>
            <Link to={'/user/posts/create'}>Create Article</Link>
            <span onClick={handleLogout}>Logout</span>
        </div>
    );
};

export default UserPanel;