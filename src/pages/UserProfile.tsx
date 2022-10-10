import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {userState} from "../redux/store";
import useAxios from "../hooks/useAxios";
import {useNavigate} from "react-router-dom";
import useProtectedRoute from "../hooks/useProtectedRoute";

const UserProfile = () => {
    useProtectedRoute();

    const { response : userResponse,error,loading} = useAxios({
        method: 'get',
        url: '/users/me',

    });
    //todo: try to fetch user data
    if(loading) return <div></div>
    return (
        <div>

            <h2>Moje jméno je : {
                /*@ts-ignore */
                userResponse && userResponse.data.name
            }</h2>
        </div>
    );
};

export default UserProfile;