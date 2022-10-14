import React from 'react';

interface props {
    config:{
        title: string,
        onClickHandler: () => void
    }
}
const Button : React.FC<props> = ({config}) => {
    return (
        <button onClick={config.onClickHandler} className='text-white bg-blue-500 px-2 py-2 rounded hover:scale-110 transition-transform font-medium'>
            {config.title}
        </button>
    );
};

export default Button;