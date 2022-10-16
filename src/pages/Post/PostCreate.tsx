import React from 'react';
import useProtectedRoute from "../../hooks/useProtectedRoute";
import PostForm from "../../components/posts/PostForm";
import { motion } from 'framer-motion';



const PostCreate = () => {
    useProtectedRoute();

    return (
        <motion.div   initial={{opacity:0}}
                      animate={{opacity:1}}
                      exit={{opacity:0}}>

            <PostForm config={{
                heading: 'Create new article',
                method: 'create'
            }}/>
        </motion.div>
    );
};

export default PostCreate;