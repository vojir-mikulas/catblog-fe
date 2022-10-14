import React, {useContext, useState} from 'react';
import logo from '../img/logo.png'
import {Link, useNavigate} from "react-router-dom";
import UserPanel from "./UserPanel";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from "react-redux";
import {userState} from "../redux/store";

const Header = () => {
    const {user}: any = useSelector(userState)
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <>
            <header className='bg-gray-50 fixed w-full z-10'>
                <div className='lg:container mx-auto h-14  flex justify-between  items-center  mobile:px-5'>
                    <nav className='flex-auto flex items-center gap-3  mobile:flex-grow-0'>
                        <img src={logo} alt="logo" className='w-11 h-12 cursor-pointer'
                             onClick={() => (navigate('/'))}/>

                        <Link to={'/'} className='text-gray-500 hover:text-black transition-colors mobile:hidden'>Recent
                            articles</Link>
                        <a className='text-gray-500 hover:text-black transition-colors mobile:hidden' target='_blank'
                           href="https://applifting.cz/">About</a>
                    </nav>
                    {user && <span className='text-3xl cursor-pointer hidden mobile:block' onClick={() => {
                        setMenuOpen(!menuOpen)
                    }}> <FontAwesomeIcon icon={faBars}/></span>}

                    <UserPanel isVisible={menuOpen} setVisible={setMenuOpen}/>

                </div>
            </header>

        </>
    );
};

export default Header