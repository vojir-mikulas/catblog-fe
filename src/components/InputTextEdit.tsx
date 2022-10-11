import React, {useState} from 'react';

interface props{
    config:{
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
    <span onClick={handleEdit}> {config.value} </span>
    </>)
    return (
        <>
            <input onBlur={handleEdit} autoFocus type="text" onChange={handleValueChange} value={config.value}/>
        </>
    );
};

export default InputTextEdit;