import React, {useState} from 'react';
import {useLoginUser} from "../hooks/service/authService";
import InputText from "./forms/InputText";
import {UserLogin} from "../interfaces/User";

interface pageProps {
    handleModalChange: any;
}

const LoginModal: React.FC = () => {
    const [registerModal, setRegisterModal] = useState<boolean>(false)

    const handleModalChange = () => {
        setRegisterModal(!registerModal)
    }


    if (registerModal) return <RegisterPage handleModalChange={handleModalChange}/>
    return <LoginPage handleModalChange={handleModalChange}/>
};

const LoginPage: React.FC<pageProps> = ({handleModalChange}) => {
    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    const userLogin: UserLogin = {
            email,
            password
        }
    const handleLogin = useLoginUser(userLogin);
    return (
        <div>
            <h2>Log In</h2>
            <InputText config={{
                name: 'email',
                placeholder: 'name@example.com',
                setValue: setEmail,
                value: email,
                setError: setEmailError,
                error: emailError
            }}/>
            <InputText config={{
                name: 'password',
                placeholder: '******',
                setValue: setPassword,
                value: password,
                setError: setPasswordError,
                error: passwordError
            }}/>
            <span onClick={handleModalChange}>Don't have an account yet?</span>


            <button onClick={handleLogin}>Log In</button>
        </div>
    );
}

const RegisterPage: React.FC<pageProps> = ({handleModalChange}) => {
    return (
        <div>
            <h2>Register</h2>
            <label htmlFor="">
                Name
                <input type="text" placeholder={"Libor"}/>
            </label>
            <label htmlFor="">
                Surname
                <input type="text" placeholder={"Fiala"}/>
            </label>
            <label htmlFor="">
                Email
                <input type="text" placeholder={"me@example.com"}/>
            </label>
            <label htmlFor="" placeholder={"******"}>
                Password
                <input type="text" placeholder={"******"}/>
            </label>
            <label htmlFor="" placeholder={"******"}>
                Password
                <input type="text" placeholder={"******"}/>
            </label>
            <span onClick={handleModalChange}>Already have an account?</span>
            <button>Register</button>
        </div>
    )
}

export default LoginModal;