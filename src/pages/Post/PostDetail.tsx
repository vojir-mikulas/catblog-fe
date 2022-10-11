import React from 'react';
import {useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {DateTime} from "luxon";

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
                        <span>{`${post?.data.author.name} ${post?.data.author.surname}`}</span> <span>{`${DateTime.fromISO(post?.data.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}`}</span>
                    </header>
                    <img src={`${process.env.REACT_APP_BASEURL}${post?.data.thumbnail}`} alt="thumbnail"/>
                    <p dangerouslySetInnerHTML={{__html:post?.data.content}}></p>
                </article>
            </section>
            <section>

            </section>
        </div>
    );
};

export default PostDetail;