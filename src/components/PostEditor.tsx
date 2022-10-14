import React from 'react';
import {Editor} from "@tinymce/tinymce-react";

interface props{
    config:{
        setContent:any,
        initialValue?: string,
        error?: any
    }
}

const PostEditor : React.FC<props> = ({config}) => {
    return (
        <label htmlFor="">
            <span className='font-medium my-1'> Content</span>
          <div className={config.error ? 'border border-red-400 rounded' :''}>
              <Editor
                  onEditorChange={(content:string)=>{config.setContent(content); console.log(content)}}
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
          </div>
        </label>
    );
};

export default PostEditor;