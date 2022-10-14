import React, {useEffect} from 'react';
import {InputError} from "../../interfaces/InputError";

interface props {
    config:{
        name:string;
        placeholder:string;
        regex?:RegExp;
        //TODO: set proper types
        setValue: any;
        value:string;
        setError: any;
        error: InputError | null;
        errorMessage?: string;
        type?: string;
    }
}

const InputText : React.FC<props> = ({config}) => {
    useEffect(() => {

        if(!config.regex) return ;

        if (config.regex && !config.regex.test(config.value)) {
            config.setError({
                ErrorMessage: `${config.errorMessage}`
            });
        } else if(config.regex ){
            config.setError(null);
        }
    },[config.value]);
    return (
        <label htmlFor={config.name} className={`flex flex-col my-3`}>
            <span className='font-medium my-1'>{config.name}</span>
            <input className={`h-9 border rounded px-5 ${config.error && 'border-red-400 text-red-400'}`}  type={config.type ? config.type : 'text'} name={config.name} value={config.value}  id={config.name}  placeholder={config.placeholder} onInput={(e)=>{
                config.setValue(e.currentTarget.value)
            }} />

        </label>
    );
};

export default InputText;