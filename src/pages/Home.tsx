import React, {useEffect, useState} from 'react';
import useAxios from "../hooks/useAxios";
import PostItem from "../components/posts/PostItem";
import Post from "../interfaces/Post";


const Home = () => {
    const {response: posts,loading} = useAxios({
        method:'get',
        url:'/posts',
    })
    if(loading) return <div></div>

    return (
        <div>
            <h1>Recent articles</h1>
           <div>
               {posts && posts.data.map((post: Post)=>{
                   return(
                       <PostItem key={post.id} config={{
                           ...post
                       }}/>
                   )
               })}
           </div>
        </div>
    )
};

export default Home;