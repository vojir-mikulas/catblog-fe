import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {userState} from "../redux/store";

const UseProtectedRoute = () => {
    const {user} = useSelector(userState)

    const navigate = useNavigate();

    useEffect(() => {
       if (!user) return navigate('/', {replace: true})
    }, [user])
};

export default UseProtectedRoute;