import React, {useContext, useState} from 'react';
import logo from '../img/logo.png'
import {Link, useNavigate} from "react-router-dom";
import UserPanel from "./UserPanel";


const Header = () => {
    const navigate = useNavigate()

    return (
        <>
            <header className='bg-gray-50 fixed w-full'>
                <div className='lg:container mx-auto h-14  flex justify-between '>
                    <nav className='flex-auto flex items-center gap-3'>
                        <img src={logo} alt="logo" className='w-11 h-12 cursor-pointer' onClick={()=>(navigate('/'))}/>

                        <Link to={'/'} className='text-gray-500 hover:text-black transition-colors'>Recent articles</Link>
                        <Link to={'/user/profile'} className='text-gray-500 hover:text-black transition-colors'>About</Link>
                    </nav>

                    <UserPanel/>
                </div>
            </header>

        </>
    );
};

export default Header