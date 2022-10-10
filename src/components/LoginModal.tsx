import React, {useEffect, useState} from 'react';
import {useLoginUser, useRegisterUser} from "../hooks/service/authService";
import InputText from "./forms/InputText";
import {User, UserLogin} from "../interfaces/User";
import {toast, ToastContainer} from "react-toastify";
import {InputError} from "../interfaces/InputError";

interface pageProps {
    handleModalChange: any;
    handleOpenLogin?: () => void;
}

interface props {
    config: {
        handleOpenLogin: () => void
    }
}

const errorCheck = (errors: Array<InputError | null>) => {
    let isError: boolean = false
    errors.forEach((err: InputError | null) => {
        if (!err) return;

        toast.error(`${err.ErrorMessage} 😥`)
        isError = true;
    })
    return isError
}

const LoginModal: React.FC<props> = ({config}) => {
    const [registerPage, setRegisterPage] = useState<boolean>(false)

    const handleModalChange = () => {
        setRegisterPage(!registerPage)
    }

    if (registerPage) return <RegisterPage handleModalChange={handleModalChange}/>
    return <LoginPage handleModalChange={handleModalChange} handleOpenLogin={config.handleOpenLogin}/>
};

const LoginPage: React.FC<pageProps> = ({handleModalChange, handleOpenLogin}) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [emailError, setEmailError] = useState<InputError | null>(null)
    const [passwordError, setPasswordError] = useState<InputError | null>(null)

    const userLogin: UserLogin = {
        email,
        password
    }
    const handleLogin = useLoginUser(userLogin,handleOpenLogin);
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
            <span onClick={handleModalChange}>Don't have an account yet?</span>


            <button onClick={async () => {

                if (errorCheck([emailError, passwordError])) return
                await handleLogin()

            }}>Log In
            </button>

        </div>
    );
}

const RegisterPage: React.FC<pageProps> = ({handleModalChange}) => {
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
    const handleRegister = useRegisterUser(newUser, handleModalChange);

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
            <span onClick={handleModalChange}>Already have an account?</span>
            <button onClick={async ()=>{
                if(errorCheck([nameError,surnameError,emailError,passwordError,passwordCheckError,isPasswordEqual])) return
                await handleRegister()
            }}>Register</button>
        </div>
    )
}

export default LoginModal;