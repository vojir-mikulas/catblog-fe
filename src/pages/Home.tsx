import React from 'react';
import useAxios from "../hooks/useAxios";
import PostItem from "../components/posts/PostItem";
import Post from "../interfaces/Post";
import { motion } from 'framer-motion';


const Home = () => {
    const {response: posts,loading} = useAxios({
        method:'get',
        url:'/posts',
    })
    if(loading) return <div></div>

    return (
        <motion.div className={'md:container mx-auto mb-20 '}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}>
            <h1 className='font-medium text-4xl my-4'>Recent articles</h1>
           <div className='flex flex-col gap-4'>
               {posts && posts.data.map((post: Post)=>{
                   return(
                       <PostItem key={post.id} config={{
                           ...post
                       }}/>
                   )
               })}
           </div>
        </motion.div>
    )
};

export default Home;