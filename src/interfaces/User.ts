
export interface User{
    id: number;
    name: string;
    surname: string;
    email: string;
    password?: string;
    avatar?: string;
}

export interface UserLogin{
    email: string;
    password: string;
}