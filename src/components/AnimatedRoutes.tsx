import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import PostDetail from "../pages/Post/PostDetail";
import Auth from "../pages/Auth";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UserProfile from "../pages/User/UserProfile";
import UserPosts from "../pages/User/UserPosts";
import PostCreate from "../pages/Post/PostCreate";
import PostEdit from "../pages/Post/PostEdit";
import {AnimatePresence,motion} from "framer-motion";


const AnimatedRoutes = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}>
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
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;