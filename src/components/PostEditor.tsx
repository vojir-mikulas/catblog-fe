import React from 'react';
import {Editor} from "@tinymce/tinymce-react";

interface props{
    config:{
        setContent:any,
        initialValue?: string,
    }
}

const PostEditor : React.FC<props> = ({config}) => {
    return (
        <label htmlFor="">
            Content
            <Editor
                onEditorChange={(content:string)=>{config.setContent(content)}}
                initialValue={config.initialValue}
                init={{

                    height: 500,
                    menubar: false,
                    toolbar: 'undo redo | formatselect | ' +
                        'h1 h2 |bold italic | alignleft aligncenter ' +
                        'alignright alignjustify | ' +
                        'removeformat ',

                }}
            />
        </label>
    );
};

export default PostEditor;