import React, {createContext, useContext, useState} from 'react';
import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";

import UserProfile from "./pages/UserProfile";


export interface User {
    name: string;
    surname: string;
    email: string;
}

function App() {


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
