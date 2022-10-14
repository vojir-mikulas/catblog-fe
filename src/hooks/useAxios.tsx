import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import React, {useEffect, useState} from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../redux/user-slice";
import {toast} from "react-toastify";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,

})
const axiosRefreshTokenInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
})

const cookie = new Cookies;

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
        const access_token = cookie.get('access_token');
        if (access_token && config.headers) config.headers["Authorization"] = `Bearer ${access_token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use((res: AxiosResponse) => {
    return res
}, async (err) => {
    const originalConfig = err.config;
    const status = err.response ? err.response.status : null
    if (err.response) {
        toast.error(`${err.response.data.message} 😥`)
        if (status === 401) {
            try {
                const refresh_token = cookie.get('refresh_token')
                const rs = await axiosRefreshTokenInstance.request({
                    method: 'post',
                    url: '/auth/token',
                    headers: {
                        Authorization: `Bearer ${refresh_token}`,
                    },

                })

                const {access_token} = rs.data;
                if (cookie.get('access_token')) cookie.remove('access_token',{path:'/'})
                cookie.set('access_token', access_token,{path:'/'});

                originalConfig.headers['Authorization'] = `Bearer ${access_token}`;

                return await axiosInstance.request(originalConfig)
            } catch (error) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(err)
    }
})


export const Axios = async (params: AxiosRequestConfig, cb?: (value: void) => void) => {
    let response: AxiosResponse | undefined;
    let error: AxiosError | undefined;

    await axiosInstance.request(params)
        .then((res: AxiosResponse) => {
            //TODO: why is this undefined?
            response = res

        })
        .catch((err) => {
            error = err;

        }).then(cb)

    return {response, error}
}

const UseAxios = (params: AxiosRequestConfig,deps?: Array<any>) => {
    const [response, setResponse] = useState<AxiosResponse | null>(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetch = async () => {
        await axiosInstance.request(params)
            .then((res: any) => {
                setResponse(res)
            })
            .catch((error) => {
                setError( error);
                if (error.response && error.response.status === 401) {
                    dispatch(logoutUser({}));
                    return navigate('/');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetch();

    }, [deps]);
    return {response, error, loading};
};


export default UseAxios;