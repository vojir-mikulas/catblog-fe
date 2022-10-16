import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {DateTime} from "luxon";
import CommentList from "../../components/comments/CommentList";
import {io, Socket} from "socket.io-client";
import {useSelector} from "react-redux";
import {userState} from "../../redux/store";
import Cookies from "universal-cookie";
import Comment from "../../interfaces/Comment";
import avatar from "../../img/avatar.jpg";
import stripHtmlMarkdown from "../../helpers/stripHtmlMarkdown";
import { motion } from 'framer-motion';
import RelatedPosts from "./components/RelatedPosts";
import Post from "./components/Post";

export const CommentContext = React.createContext({});

const PostDetail = () => {

    return (
        <motion.div className='md:container mx-auto flex'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}>

            <Post/>
            <RelatedPosts/>
        </motion.div>
    );
};

export default PostDetail;