import {User} from "./User";

export default interface Comment{
    id?:string;
    content?:string;
    createdAt?:string;
    postId?:string;
    userId?: number
}