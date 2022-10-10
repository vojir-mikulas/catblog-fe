import React, {createContext, useContext, useEffect, useState} from 'react';
import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";


import UserProfile from "./pages/UserProfile";
import {useGetUser} from "./hooks/service/authService";
import {ToastContainer} from "react-toastify";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import UserPosts from "./pages/UserPosts";
import PostEdit from "./pages/PostEdit";



export interface User {
    name: string;
    surname: string;
    email: string;
}

function App() {
    const user = useGetUser();
    return (
        <Router>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'posts'}>

                    <Route path={':id'} element={<PostDetail/>}/>
                </Route>


                <Route path={'user'}>
                    <Route path={'profile'} element={<UserProfile/>}/>
                    <Route path={'posts'}>
                        <Route path={''} element={<UserPosts/>}/>
                        <Route path={'create'} element={<PostCreate/>}/>
                        <Route path={':id'} element={<PostEdit/>}/>
                    </Route>
                </Route>



            </Routes>
        </Router>
    );
}


export default App;
