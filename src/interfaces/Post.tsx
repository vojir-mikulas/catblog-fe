export interface Author{
    name:string,
    surname:string,
    avatar?:string,
}

export interface Comment{
    id: number,
    title:string,
    content:string,
    createdAt:string,
    author: Author
}

export default interface Post {
    id?: string;
    title: string;
    content: string;
    thumbnail?: string;
    createdAt?: string;
    author?: Author,
    comments?: Array<Comment>
}