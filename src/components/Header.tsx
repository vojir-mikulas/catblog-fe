import React, {useContext, useState} from 'react';
import logo from '../img/logo.png'
import {Link} from "react-router-dom";
import UserPanel from "./UserPanel";
import LoginModal from "./LoginModal";



const Header = () => {
    const [loginOpen, setLoginOpen] = useState<boolean>(false)

    return (
        <>
            <header>
                <div>
                    <div>
                        <img src={logo} alt="logo"/>
                        <nav>
                            <Link to={'/Home'}>Recent articles</Link>
                            <Link to={'/'}>About</Link>
                        </nav>
                    </div>

                    <UserPanel config={{
                        setLoginOpen,
                        loginOpen
                    }}/>
                </div>
            </header>
            {loginOpen && <LoginModal/>}
        </>
    );
};

export default Header