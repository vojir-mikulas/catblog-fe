import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from "../redux/user-slice";
import useAxios, {Axios} from "../hooks/useAxios";
import axios, {AxiosResponse} from "axios";
import {User} from "../interfaces/User";
import Cookies from "universal-cookie";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL

interface Tokens{
    access_token: string;
    refresh_token: string;
}

const LoginModal: React.FC = () => {
    const [registerModal, setRegisterModal] = useState<boolean>(false)
    const dispatch = useDispatch();

    const [tokens,setTokens] = useState();

    const handleModalChange = () => {
        setRegisterModal(!registerModal)
    }
    const handleLogin = async () => {
        const mockUser: User = {
            id: 1,
            name: "Mikes",
            surname: "Vojir",
            email: "vojir@gmail.com",
            password: "123"
        }


        const {response,error} = await Axios({
            method: 'post',
            url: '/auth/login',
            data:{
                ...mockUser
            }
        })


       if(response){
           const cookie = new Cookies()
           cookie.set('access_token', response.data.access_token)
           cookie.set('refresh_token', response.data.refresh_token)
       }
        dispatch(loginUser({
            ...mockUser
        }))
    }
    console.log(tokens)
    if (registerModal) return (
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
    return (
        <div>
            <h2>Log In</h2>
            <label htmlFor="">
                Email
                <input type="text" placeholder={"me@example.com"}/>
            </label>
            <label htmlFor="">
                Password
                <input type="text" placeholder={"******"}/>
            </label>
            <span onClick={handleModalChange}>Don't have an account yet?</span>



            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default LoginModal;