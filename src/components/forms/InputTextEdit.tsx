import React, {useState} from 'react';

interface props{
    config:{
        name?:string,
        value:string,
        setValue: any,
    }
}
const InputTextEdit : React.FC<props> = ({config}) => {
    const [edit,setEdit] = useState<boolean>(false);
    const handleEdit = ()=>{
        setEdit(!edit);
    }
    const handleValueChange = (e : any)=>{
        config.setValue(e.currentTarget.value)
    }
    if(!edit) return (<>
    <span onClick={handleEdit} className='cursor-text'> {config.value} </span>
    </>)
    return (
        <>
            <input name={config.name} onBlur={handleEdit} autoFocus type="text" onChange={handleValueChange} value={config.value}/>
        </>
    );
};

export default InputTextEdit;