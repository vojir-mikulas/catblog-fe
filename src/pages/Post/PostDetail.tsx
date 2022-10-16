import React, {useEffect, useMemo, useState} from 'react';
import { motion } from 'framer-motion';
import RelatedPosts from "./components/RelatedPosts";
import Post from "./components/Post";



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