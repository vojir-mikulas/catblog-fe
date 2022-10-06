import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import React, {useEffect, useState} from 'react';
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    timeout: 6000

})
const axiosRefreshTokenInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
})

const cookie = new Cookies;

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
        const access_token = cookie.get('access_token')
        if (access_token) {
            //todo: odebrat tuhle nechutnost
            //@ts-ignore
            config.headers["Authorization"] = `Bearer ${access_token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use((response: AxiosResponse) => response, async (err) => {
    const originalConfig = err.config;

    if (err.response) {
        if (err.response.status === 401) {
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
                cookie.set('access_token', access_token)


                return axiosInstance(originalConfig)
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
})


interface TokensDto {
    access_token: string;
    refresh_token: string;
}

export const Axios = async (params: AxiosRequestConfig) => {
    let response: AxiosResponse<TokensDto> | undefined;
    let error;

    await axiosInstance.request(params)
        .then((res: AxiosResponse) => {
            response = res
        }) // @ts-ignore
        .catch((err) => {
            error = err;
        })

    return {response, error}
}

const UseAxios = (params: AxiosRequestConfig) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState<AxiosError | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const fetch = () => {
        // @ts-ignore
        axiosInstance.request(params)
            .then((res: AxiosResponse) => {
                setResponse(res.data)
            }) // @ts-ignore
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetch();
    }, []);
    //@ts-ignore
    if(error && error.response.status === 401) navigate('/')
    return {response, error, loading};
};


export default UseAxios;