import React, {createContext, useContext, useEffect, useState} from 'react';
import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";


import UserProfile from "./pages/User/UserProfile";
import {useGetUser} from "./hooks/service/authService";
import {ToastContainer} from "react-toastify";
import PostDetail from "./pages/Post/PostDetail";
import PostCreate from "./pages/Post/PostCreate";
import UserPosts from "./pages/User/UserPosts";
import PostEdit from "./pages/Post/PostEdit";
import Auth from "./pages/Auth";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


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
                <Route path={'auth'}>
                    <Route index element={<Auth/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'register'} element={<Register/>}/>
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
