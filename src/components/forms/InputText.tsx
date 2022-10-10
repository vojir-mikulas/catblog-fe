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
        <label htmlFor={config.name}>
            {config.name}
            <input type={config.type ? config.type : 'text'} name={config.name} value={config.value}  id={config.name}  placeholder={config.placeholder} onInput={(e)=>{
                config.setValue(e.currentTarget.value)
            }} />
            {config.error && <span className='text-red-600'>Error</span>}
        </label>
    );
};

export default InputText;