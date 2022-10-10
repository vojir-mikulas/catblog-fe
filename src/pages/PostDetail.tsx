import React from 'react';
import {useParams} from "react-router-dom";
import useAxios from "../hooks/useAxios";

const PostDetail = () => {
    const{id} = useParams();
    const {response: post,loading: postLoading} = useAxios({
        method:'get',
        url:`/posts/${id}`,
    })
    if(postLoading) return <div></div>
    return (
        <div>
            <aside>
                <h2>Related articles</h2>

            </aside>
            <section>
                <article>
                    <header>
                        <h1>{post?.data.title}</h1>
                        <span>{`${post?.data.author.name} ${post?.data.author.surname}`}</span>
                    </header>
                    <img src="" alt="thumbnail"/>
                    <p>{post?.data.content}</p>
                </article>
            </section>
            <section>

            </section>
        </div>
    );
};

export default PostDetail;