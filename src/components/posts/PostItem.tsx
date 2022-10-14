import React from 'react';
import Post from "../../interfaces/Post";
import { DateTime } from 'luxon';
import {useNavigate} from "react-router-dom";
import stripHtml from "../../helpers/stripHtmlMarkdown";


interface props{
    config: Post
}



const PostItem : React.FC<props> = ({config}) => {
    const navigate = useNavigate()

    return (
        <div className='flex h-full mobile:flex-col mobile:items-center' >
            <div className=' object-cover w-72 h-64 mobile:w-full'>
                <img src={`${process.env.REACT_APP_BASEURL}${config.thumbnail}`} className=' object-cover w-full h-full' alt="thumbnail"/>
            </div>
            <article className='w-2/3  ml-5 flex flex-col  mobile:w-full mobile:m-0 mobile:p-4'>
               <div>
                   <h3 className='text-2xl font-medium  '>{config.title}</h3>
                   <div className='flex gap-3 text-gray-500 text-sm my-3'>
                       <span>{config.author && `${config.author.name} ${config.author.surname}`}</span> <span>●</span>
                       <span>{config.createdAt && `${DateTime.fromISO(config.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}`}</span>
                   </div>
                   <p> {stripHtml(config.content).substring(0,500)}...</p>
               </div>
                <footer className='text-sm flex gap-4 mt-5  '>
                    <span className='text-blue-500 cursor-pointer' onClick={() =>(navigate(`posts/${config.id}`))}>Read whole article</span>
                    <span className='text-gray-500'>Comments {config._count && config._count.comments}</span>
                </footer>
            </article>
        </div>
    );
};

export default PostItem;