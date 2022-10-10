import React, {useContext, useState} from 'react';
import logo from '../img/logo.png'
import {Link} from "react-router-dom";
import UserPanel from "./UserPanel";
import LoginModal from "./LoginModal";



const Header = () => {
    const [loginOpen, setLoginOpen] = useState<boolean>(false)
    const handleOpenLogin = () => {
        setLoginOpen(!loginOpen)
    }
    return (
        <>
            <header>
                <div>
                    <div>
                        <img src={logo} alt="logo"/>
                        <nav>
                            <Link to={'/'}>Recent articles</Link>
                            <Link to={'/user/profile'}>About</Link>
                        </nav>
                    </div>

                    <UserPanel config={{
                        handleOpenLogin
                    }}/>
                </div>
            </header>
            {loginOpen && <LoginModal config={{
                handleOpenLogin
            }}/>}
        </>
    );
};

export default Header