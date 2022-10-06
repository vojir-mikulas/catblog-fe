import {Axios} from "../useAxios";
import {loginUser, logoutUser} from "../../redux/user-slice";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {User, UserLogin} from "../../interfaces/User";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";


export const useGetUser = () => {
    const [user, setUser] = useState<User>()
    const dispatch = useDispatch();
    const getUser = async () => {
        const {response: user, error} = await Axios({
            method: 'get',
            url: '/users/me'
        })
        setUser(user?.data);
        if (user && !error) {
            dispatch(loginUser({
                ...user.data
            }))
        }

        if (error?.response && error.response.status === 401) {
            dispatch(logoutUser({}))
        }
        return;
    }

    useEffect(() => {
        getUser();
    }, [])
    return user;
}

export const useLogoutUser = (): () => void => {
    const dispatch = useDispatch();
    const cookie = new Cookies;
    const navigate = useNavigate();
    return () => {
        cookie.remove('access_token');
        cookie.remove('refresh_token');
        dispatch(logoutUser({}))
        navigate('/', {replace: true})
    }
}

export const useLoginUser = (login: UserLogin) => {

    const dispatch = useDispatch()
    const cookie = new Cookies()
    return async () => {
        const {response: tokens} = await Axios({
            method: 'post',
            url: '/auth/login',
            data: {
                ...login
            }
        })
        if (!tokens) return

        cookie.set('access_token', tokens.data.access_token)
        cookie.set('refresh_token', tokens.data.refresh_token)


        const {response: user} = await Axios({
            method: 'get',
            url: '/users/me',
            data: {
                ...login
            }
        })
        dispatch(loginUser({
            ...user?.data
        }))
    }
}