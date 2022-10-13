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
        <div onClick={() =>(navigate(`posts/${config.id}`))}>
            <img src={`${process.env.REACT_APP_BASEURL}${config.thumbnail}`} alt="thumbnail"/>
            <article>
                <h3>{config.title}</h3>
                <div>
                    <span>{config.author && `${config.author.name} ${config.author.surname}`}</span>
                    <span>{config.createdAt && `${DateTime.fromISO(config.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}`}</span>
                </div>
                <p> {stripHtml(config.content)}</p>
                <div>
                    <span>Read whole article</span>
                    <span>Comments {config._count && config._count.comments}</span>
                </div>
            </article>
        </div>
    );
};

export default PostItem;