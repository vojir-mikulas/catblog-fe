import React from 'react';
import {useSelector} from "react-redux";
import {userState} from "../redux/store";
import useAxios from "../hooks/useAxios";

const UserProfile = () => {
    const {user} = useSelector(userState)
    const userResponse = useAxios({
        method: 'get',
        url: '/users/me',

    });

    //todo: try to fetch user data
    return (
        <div>

            <h2>Moje jméno je : {
                /*@ts-ignore */
                userResponse.response && userResponse.response.name
            }</h2>
        </div>
    );
};

export default UserProfile;