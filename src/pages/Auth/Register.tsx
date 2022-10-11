import React, {useEffect, useState} from 'react';
import {InputError} from "../../interfaces/InputError";
import {User} from "../../interfaces/User";
import {useRegisterUser} from "../../hooks/service/authService";
import InputText from "../../components/forms/InputText";
import {useNavigate} from "react-router-dom";
import {errorCheck} from "../../helpers/ErrorCheck";
import {useSelector} from "react-redux";
import {userState} from "../../redux/store";

const Register = () => {
    const {user} = useSelector(userState)

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCheck, setPasswordCheck] = useState<string>('')


    const [nameError, setNameError] = useState<InputError | null>(null)
    const [surnameError, setSurnameError] = useState<InputError | null>(null)
    const [emailError, setEmailError] = useState<InputError | null>(null)
    const [passwordError, setPasswordError] = useState<InputError | null>(null)
    const [passwordCheckError, setPasswordCheckError] = useState<InputError | null>(null)
    const [isPasswordEqual, setIsPasswordEqual] = useState<InputError | null>(null)
    const newUser: User = {
        name,
        surname,
        email,
        password
    }
    const handleRegister = useRegisterUser(newUser);
    const navigate = useNavigate()
    const handleNavigateToLogin = () =>{
        navigate('/auth/login')
    }
    useEffect(()=>{
        if(user) navigate('/');
    },[user])
    useEffect(() => {
        if (passwordCheck !== password) {
            setIsPasswordEqual({
                ErrorMessage: 'Passwords must be the same'
            })
        } else {
            setIsPasswordEqual(null)
        }
    }, [password, passwordCheck])
    return (
        <div>
            <h2>Register</h2>
            <InputText config={{
                name: 'name',
                placeholder: 'Libor',
                regex: /^(?!\s*$).+/,
                setValue: setName,
                value: name,
                setError: setNameError,
                error: nameError,
                errorMessage: 'Name is invalid'
            }}/>
            <InputText config={{
                name: 'surname',
                placeholder: 'Fiala',
                regex: /^(?!\s*$).+/,
                setValue: setSurname,
                value: surname,
                setError: setSurnameError,
                error: surnameError,
                errorMessage: 'Surname is invalid'

            }}/>
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
                errorMessage: 'Password is invalid'
            }}/>
            <InputText config={{
                name: 'password',
                placeholder: '******',
                regex: /^(?!\s*$).+/,
                setValue: setPasswordCheck,
                value: passwordCheck,
                setError: setPasswordCheckError,
                error: passwordCheckError,
                errorMessage: 'Password is invalid'
            }}/>
            <span onClick={handleNavigateToLogin}>Already have an account?</span>
            <button onClick={async ()=>{
                if(errorCheck([nameError,surnameError,emailError,passwordError,passwordCheckError,isPasswordEqual])) return
                await handleRegister()
            }}>Register</button>
        </div>
    )
};

export default Register;