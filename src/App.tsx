import React, {createContext, useContext, useEffect, useState} from 'react';
import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";

import UserProfile from "./pages/UserProfile";
import useAxios, {Axios} from "./hooks/useAxios";
import {useDispatch} from "react-redux";
import {loginUser, logoutUser} from "./redux/user-slice";
import {useGetUser} from "./hooks/service/authService";


export interface User {
    name: string;
    surname: string;
    email: string;
}

function App() {
    const user = useGetUser();
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path={'/Home'} element={<Home/>}/>
                <Route path={'/profile'} element={<UserProfile/>}/>
            </Routes>
        </Router>
    );
}


export default App;
