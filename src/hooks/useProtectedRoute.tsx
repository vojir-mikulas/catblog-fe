import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {userState} from "../redux/store";

const UseProtectedRoute = () => {
    const {user} = useSelector(userState)
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{

            if(!user) return navigate('/',{replace:true})
        },1000)
    },[user])
};

export default UseProtectedRoute;