import React, {useEffect, useState} from 'react';
import {InputError} from "../../interfaces/InputError";
import {UserLogin} from "../../interfaces/User";
import {useLoginUser} from "../../hooks/service/authService";
import InputText from "../../components/forms/InputText";
import {useNavigate} from "react-router-dom";
import {errorCheck} from "../../helpers/ErrorCheck";
import {useSelector} from "react-redux";
import {userState} from "../../redux/store";

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
        <div>
            <h2>Log In</h2>
            <InputText config={{
                name: 'email',
                placeholder: 'name@example.com',
                regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                setValue: setEmail,
                value: email,
                setError: setEmailError,
                error: emailError,
                errorMessage: 'Email is invalid'
            }}/>
            <InputText config={{
                name: 'password',
                placeholder: '******',
                regex: /^(?!\s*$).+/,
                setValue: setPassword,
                value: password,
                setError: setPasswordError,
                error: passwordError,
                type: 'password',
                errorMessage: 'Password is invalid'
            }}/>
            <span onClick={handleNavigateToRegister}>Don't have an account yet?</span>


            <button onClick={async () => {

                if (errorCheck([emailError, passwordError])) return
                await handleLogin()

            }}>Log In
            </button>

        </div>
    );
};

export default Login;