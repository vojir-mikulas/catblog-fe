import {useState} from "react";
import Post from "../interfaces/Post";



const UseTableSort = (array: Array<any>,setArray : any,orderBy:string) => {
    const [order,setOrder] = useState<string>('asc')
    return () => {
        setOrder(order === "asc" ? "desc" : "asc");
        let arr: Array<Post> = array;
        // @ts-ignore
        arr = arr.sort((a: Post,b: Post) => a[orderBy].localeCompare(b[orderBy]));
        if(order === 'desc') arr = arr.reverse();
        setArray([...arr]);
    }
};

export const UseTableSortByAuthor = (array: Array<any>,setArray : any) => {
    const [order,setOrder] = useState<string>('asc')
    return () => {
        setOrder(order === "asc" ? "desc" : "asc");
        let arr: Array<Post> = array;
        // @ts-ignore
        arr = arr.sort((a: Post,b: Post) => a.author?.name.localeCompare(b.author?.name));
        if(order === 'desc') arr = arr.reverse();
        setArray([...arr]);
    }
};

export const UseTableSortByComments = (array: Array<any>,setArray : any) => {
    const [order,setOrder] = useState<string>('asc')
    return () => {
        setOrder(order === "asc" ? "desc" : "asc");
        let arr: Array<Post> = array;
        // @ts-ignore
        arr = arr.sort((a: Post,b: Post) => a.comments?.length - b.comments?.length);
        if(order === 'desc') arr = arr.reverse();
        setArray([...arr]);
    }
};
export default UseTableSort;