import React from 'react';
import stripHtmlMarkdown from "../../../helpers/stripHtmlMarkdown";
import useAxios from "../../../hooks/useAxios";
import {useNavigate, useParams} from "react-router-dom";

const RelatedPosts = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {response: relatedPosts, loading: relatedPostsLoading} = useAxios({
        method: 'get',
        url: '/posts',
    })
    if(relatedPostsLoading) return <div></div>
    return (
        <aside className='w-2/6 mobile:hidden'>
            <div className=' sticky top-20 flex flex-col border-l border-gray-300 px-7 mx-7'>
                <h2 className='text-2xl font-medium my-6'>Related articles</h2>
                <div className='flex flex-col'>
                    {relatedPosts?.data.map((post: any) => {
                        if(relatedPosts?.data.id === id) return;
                        return (
                            <div className='my-1 cursor-pointer'
                                 onClick={() => (navigate(`/posts/${post.id}`, {replace: true}))}>
                                <h4 className='font-medium '>{post.title}</h4>
                                <p className='text-sm'>{stripHtmlMarkdown(post.content.substring(0, 40))}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </aside>
    );
};

export default RelatedPosts;