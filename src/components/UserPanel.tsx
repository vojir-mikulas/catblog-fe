
import { useSelector} from "react-redux";
import {userState} from "../redux/store";
import {Link, useNavigate} from "react-router-dom";
import {useLogoutUser} from "../hooks/service/authService";
import React from "react";
import avatar from "../img/avatar.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const UserPanel: React.FC<any> = ({isVisible,setVisible}) => {
    const {user}: any = useSelector(userState)
    const handleCloseMenu = ()=>{
        setVisible(false)
    }
    const navigate = useNavigate();
    const handleNavigateToLogin = ()=>{
        navigate('/auth/login')
    }

    const handleLogout = useLogoutUser();
    if (!user) return (
        <div className='flex items-center'>
            <span onClick={handleNavigateToLogin} className='cursor-pointer text-blue-600'>Login <FontAwesomeIcon icon={faArrowRight}/></span>
        </div>
    )
    return (
        <>
            <div  className={`flex items-center gap-3 mobile:flex mobile:pt-10 mobile:z-30 mobile:text-2xl mobile:flex-col  mobile:fixed mobile:bg-white mobile:h-full mobile:w-4/6 mobile:top-0 mobile:left-0 ${isVisible ? 'mobile:block' : 'mobile:hidden'}`}>

                <div onClick={handleCloseMenu}><Link to={'/'} className='hover:text-blue-600 transition-colors hidden mobile:block'>Recent
                    articles</Link></div>
                <div onClick={handleCloseMenu}><a className='hover:text-blue-600 transition-colors hidden mobile:block' target='_blank'
                        href="https://applifting.cz/">About</a></div>
                <div onClick={handleCloseMenu}><Link to={'/user/posts'} className='hover:text-blue-600 transition-colors'>My Articles</Link></div>
                <div onClick={handleCloseMenu}><Link to={'/user/posts/create'} className='hover:text-blue-600 transition-colors'>Create Article</Link></div>
                <div onClick={handleCloseMenu}><Link to={'/user/profile'} className='hover:text-blue-600 transition-colors'>My profile</Link></div>

                <div onClick={handleCloseMenu}><span className='hover:text-blue-600 transition-colors cursor-pointer' onClick={handleLogout}> Log Out </span></div>
                <div onClick={handleCloseMenu}><img
                    src={user?.avatar ?(process.env.REACT_APP_BASEURL + user.avatar) : avatar}
                    alt="avatar" className='w-10 h-10 object-cover rounded-full cursor-pointer' onClick={()=>(navigate('/user/profile'))}/>
                </div>

            </div>
            <div onClick={handleCloseMenu} className={`hidden bg-black opacity-50 backdrop-blur-2xl w-full h-full fixed top-0 z-20 left-0 ${isVisible ? 'mobile:block' : 'mobile:hidden'} `}></div>
        </>
    );
};







export default UserPanel;