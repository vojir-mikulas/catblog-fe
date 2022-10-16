import React, {useEffect, useState} from 'react';
import {InputError} from "../../interfaces/InputError";
import {UserLogin} from "../../interfaces/User";
import {useLoginUser} from "../../hooks/service/authService";
import InputText from "../../components/forms/InputText";
import {useNavigate} from "react-router-dom";
import {errorCheck} from "../../helpers/ErrorCheck";
import {useSelector} from "react-redux";
import {userState} from "../../redux/store";
import Button from "../../components/forms/Button";
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate()
    const {user} = useSelector(userState)


    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [emailError, setEmailError] = useState<InputError | null>(null)
    const [passwordError, setPasswordError] = useState<InputError | null>(null)


    const handleNavigateToRegister = () =>{
    navigate('/auth/register')
    }
    const userLogin: UserLogin = {
        email,
        password
    }
    const handleLogin = useLoginUser(userLogin);
    useEffect(()=>{
        if(user) navigate('/');
    },[user])
    return (
        <motion.div className='h-max flex justify-center items-center '
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}>
            <form className='shadow-xl  w-96 p-7 mt-10 flex flex-col' onSubmit={(e)=>( e.preventDefault())}>
                <h2 className='text-4xl font-semibold mb-5'>Log In</h2>
                <InputText config={{
                    name: 'Email',
                    placeholder: 'name@example.com',
                    regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                    setValue: setEmail,
                    value: email,
                    setError: setEmailError,
                    error: emailError,
                    errorMessage: 'Email is invalid'
                }}/>
                <InputText config={{
                    name: 'Password',
                    placeholder: '******',
                    regex: /^(?!\s*$).+/,
                    setValue: setPassword,
                    value: password,
                    setError: setPasswordError,
                    error: passwordError,
                    type: 'password',
                    errorMessage: 'Password is invalid',
                }}/>
                <span id='Register' onClick={handleNavigateToRegister} className='text-blue-500 cursor-pointer my-3 self-center'>Don't have an account yet?</span>


                <Button config={{
                    onClickHandler: async () => {

                        if (errorCheck([emailError, passwordError])) return
                        await handleLogin()

                    },
                    title: 'Log In',
                    id: 'LoginButton'
                }}/>

            </form>
        </motion.div>
    );
};

export default Login;