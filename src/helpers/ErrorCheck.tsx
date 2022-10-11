import {InputError} from "../interfaces/InputError";
import {toast} from "react-toastify";

export const errorCheck = (errors: Array<InputError | null>) => {
    let isError: boolean = false
    errors.forEach((err: InputError | null) => {
        if (!err) return;

        toast.error(`${err.ErrorMessage} 😥`)
        isError = true;
    })
    return isError
}