import React from 'react';

interface props {
    config:{
        title: string,
        onClickHandler?: any
        customStyle?: string,
        id?:string
    }
}
const Button : React.FC<props> = ({config}) => {
    return (
        <button id={config.id} onClick={config.onClickHandler} className={`text-white bg-blue-500 px-2 py-2 rounded hover:scale-110 transition-transform font-medium ${config.customStyle}`}>
            {config.title}
        </button>
    );
};

export default Button;