
import {useDispatch, useSelector} from "react-redux";
import {userState} from "../redux/store";
import {Link, useNavigate} from "react-router-dom";
import {useLogoutUser} from "../hooks/service/authService";
import React from "react";


const UserPanel: React.FC = () => {
    const {user} = useSelector(userState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleNavigateToLogin = ()=>{
        navigate('/auth/login')
    }
    const handleLogout = useLogoutUser();
    if (!user) return (
        <div>
            <span onClick={handleNavigateToLogin}>Login {"->"}</span>
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