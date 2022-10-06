import React, {useEffect} from 'react';

interface props {
    config:{
        name:string;
        placeholder:string;
        regex?:RegExp;
        //TODO: set proper types
        setValue: any;
        value:string;
        setError: any;
        error: string;
    }
}

const InputText : React.FC<props> = ({config}) => {
    useEffect(() => {

        if(!config.regex) return ;

        if (config.regex && !config.regex.test(config.value)) {
            config.setError(true);
        } else if(config.regex ){
            config.setError(false);
        }
    },[config.value]);
    return (
        <label htmlFor={config.name}>
            {config.name}
            <input type="text" name={config.name}  id={config.name}  placeholder={config.placeholder} onInput={(e)=>{
                config.setValue(e.currentTarget.value)
            }} />
            {config.error !== '' && config.error}
        </label>
    );
};

export default InputText;